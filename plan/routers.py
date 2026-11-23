from fastapi import APIRouter, HTTPException, Depends
from typing import Optional, List
from datetime import datetime, date
import io
import openpyxl
from openpyxl.chart import BarChart, PieChart, Reference
from openpyxl.chart.series import DataPoint
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from fastapi.responses import StreamingResponse

from database import get_db
from auth import get_current_user, hash_password, verify_password, create_access_token, validate_email_format, validate_password_strength
from models import (
    UserRegister, UserOut, UserLogin, TokenOut, ProfileUpdate,
    ProjectCreate, ProjectUpdate, ProjectOut, TaskCreate, TaskOut, TaskUpdate,
    CategoryCreate, CategoryOut, TagCreate, TagOut,
    ClientCreate, ClientUpdate, ClientOut,
    ReportCreate, ReportOut, TeamCreate, TeamOut, TeamMemberOut
)

router = APIRouter(prefix="/api")


# ========== ПРОВЕРКИ ДОСТУПА ==========

def _member_role(cur, team_id, user_id) -> Optional[str]:
    """Роль пользователя в команде или None, если он не участник."""
    if not team_id:
        return None
    cur.execute("SELECT role FROM team_members WHERE team_id = %s AND user_id = %s", (team_id, user_id))
    row = cur.fetchone()
    return row["role"] if row else None

def _require_member(cur, team_id, user_id):
    cur.execute("SELECT 1 FROM teams WHERE team_id = %s", (team_id,))
    if not cur.fetchone():
        raise HTTPException(404, "Команда не найдена")
    if not _member_role(cur, team_id, user_id):
        raise HTTPException(403, "Вы не состоите в этой команде")

def _require_manager(cur, team_id, user_id, message="Это может сделать только менеджер команды"):
    _require_member(cur, team_id, user_id)
    if _member_role(cur, team_id, user_id) != "manager":
        raise HTTPException(403, message)

def _get_project_for_use(cur, project_id, user_id):
    """Проект, в который пользователь может добавлять задачи: свой или проект своей команды."""
    cur.execute("SELECT project_id, author_id, team_id FROM projects WHERE project_id = %s", (project_id,))
    proj = cur.fetchone()
    if not proj:
        raise HTTPException(404, "Проект не найден")
    if proj["author_id"] != user_id and not _member_role(cur, proj["team_id"], user_id):
        raise HTTPException(403, "Нет доступа к этому проекту")
    return proj

def _check_tag(cur, tag_id, user_id):
    if tag_id is None:
        return
    cur.execute("SELECT 1 FROM tags WHERE tag_id = %s AND tag_autor_id = %s", (tag_id, user_id))
    if not cur.fetchone():
        raise HTTPException(400, "Тег не найден")

def _check_assignee(cur, team_id, assigned_to):
    if not assigned_to:
        raise HTTPException(400, "Для задачи командного проекта нужно выбрать исполнителя")
    if not _member_role(cur, team_id, assigned_to):
        raise HTTPException(400, "Исполнитель не состоит в команде проекта")

def _check_category_client(cur, user, category_id, client_id):
    if category_id is not None:
        cur.execute("SELECT 1 FROM categories WHERE category_id = %s AND category_autor_id = %s", (category_id, user["id_user"]))
        if not cur.fetchone():
            raise HTTPException(400, "Категория не найдена")
    if client_id is not None:
        if user["user_type"] != 2:
            raise HTTPException(403, "Клиенты доступны только фрилансерам")
        cur.execute("SELECT 1 FROM clients WHERE client_id = %s AND user_id = %s", (client_id, user["id_user"]))
        if not cur.fetchone():
            raise HTTPException(400, "Клиент не найден")


TASK_SELECT = """SELECT t.task_id, t.task_name, t.task_description, t.task_priority, t.task_status,
                        t.task_project_id, t.task_date::date AS task_date, t.task_tag_id, tg.tag_name,
                        TO_CHAR(t.task_time, 'HH24:MI') AS task_time, t.assigned_to,
                        u.username AS assigned_to_username, t.task_autor_id
                 FROM tasks t
                 LEFT JOIN tags tg ON t.task_tag_id = tg.tag_id
                 LEFT JOIN users u ON t.assigned_to = u.id_user"""

def _task_out(r) -> TaskOut:
    return TaskOut(
        id=r["task_id"],
        title=r["task_name"],
        description=r["task_description"] or "",
        priority=r["task_priority"],
        status=r["task_status"],
        project_id=r["task_project_id"],
        due_date=str(r["task_date"]) if r["task_date"] else None,
        tag_id=r["task_tag_id"],
        tag_name=r["tag_name"],
        task_time=r["task_time"] or None,
        assigned_to=r["assigned_to"],
        assigned_to_username=r["assigned_to_username"],
        author_id=r["task_autor_id"],
    )

def _fetch_task(cur, task_id) -> TaskOut:
    cur.execute(TASK_SELECT + " WHERE t.task_id = %s", (task_id,))
    return _task_out(cur.fetchone())


# ========== ПОЛЬЗОВАТЕЛИ ==========

@router.post("/register", response_model=UserOut)
def register(user: UserRegister, conn=Depends(get_db)):
    if not validate_email_format(user.email):
        raise HTTPException(400, "Неверный формат email")
    if not validate_password_strength(user.password):
        raise HTTPException(400, "Пароль должен содержать минимум 6 символов")
    cur = conn.cursor()
    cur.execute("SELECT id_user FROM users WHERE LOWER(email) = LOWER(%s)", (user.email,))
    if cur.fetchone():
        raise HTTPException(400, "Пользователь с таким email уже зарегистрирован")
    hashed_password = hash_password(user.password)
    cur.execute(
        "INSERT INTO users (username, email, password, user_type, notif_p) VALUES (%s, %s, %s, %s, %s) RETURNING id_user, username, email, user_type",
        (user.username, user.email, hashed_password, user.user_type, 1)
    )
    new_user = cur.fetchone()
    conn.commit()
    cur.close()
    return UserOut(id=new_user["id_user"], username=new_user["username"], email=new_user["email"], user_type=new_user["user_type"])

@router.post("/login", response_model=TokenOut)
def login(user: UserLogin, conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT id_user, password, user_type FROM users WHERE LOWER(email) = LOWER(%s)", (user.email,))
    db_user = cur.fetchone()
    cur.close()
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(401, "Неверный email или пароль")
    token = create_access_token(db_user["id_user"])
    return {"access_token": token, "token_type": "bearer", "user_type": db_user["user_type"]}

@router.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT id_user, username, email, user_type, language, notif_p FROM users WHERE id_user = %s", (current_user["id_user"],))
    user = cur.fetchone()
    cur.close()
    return {
        "id": user["id_user"],
        "username": user["username"],
        "email": user["email"],
        "user_type": user["user_type"],
        "language": user["language"],
        "notif_p": user["notif_p"]
    }

@router.put("/profile")
def update_profile(profile: ProfileUpdate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    if profile.username:
        cur.execute("UPDATE users SET username = %s WHERE id_user = %s", (profile.username, current_user["id_user"]))
    if profile.language:
        cur.execute("UPDATE users SET language = %s WHERE id_user = %s", (profile.language, current_user["id_user"]))
    if profile.notif_p is not None:
        cur.execute("UPDATE users SET notif_p = %s WHERE id_user = %s", (profile.notif_p, current_user["id_user"]))
    conn.commit()
    cur.close()
    return {"message": "Profile updated"}


# ========== ПРОЕКТЫ ==========

@router.post("/projects", response_model=ProjectOut)
def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _check_category_client(cur, current_user, project.category_id, project.client_id)
    if project.type == "team":
        if current_user["user_type"] == 2:
            raise HTTPException(403, "Фрилансер не может создавать командные проекты")
        if not project.team_id:
            raise HTTPException(400, "Выберите команду")
        _require_manager(cur, project.team_id, current_user["id_user"], "Создавать командные проекты может только менеджер команды")
        team_id = project.team_id
    else:
        team_id = None
    cur.execute(
        """INSERT INTO projects (project_name, description, author_id, project_type, team_id, category_id, client_id)
           VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING project_id""",
        (project.name, project.description, current_user["id_user"], project.type, team_id,
         project.category_id, project.client_id)
    )
    new_id = cur.fetchone()["project_id"]
    team_name = None
    if team_id:
        cur.execute("SELECT team_name FROM teams WHERE team_id = %s", (team_id,))
        team_name = cur.fetchone()["team_name"]
    conn.commit()
    cur.close()
    return ProjectOut(
        id=new_id, name=project.name, description=project.description,
        status="active", type=project.type, team_id=team_id, team_name=team_name,
        category_id=project.category_id, client_id=project.client_id, author_id=current_user["id_user"]
    )

@router.get("/projects", response_model=List[ProjectOut])
def get_projects(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("""
        SELECT p.project_id, p.project_name, p.description, p.project_type AS type,
               t.team_id, t.team_name, p.category_id, p.client_id, p.author_id
        FROM projects p
        LEFT JOIN teams t ON p.team_id = t.team_id
        LEFT JOIN team_members tm ON t.team_id = tm.team_id AND tm.user_id = %s
        WHERE p.author_id = %s OR tm.user_id IS NOT NULL
        ORDER BY p.project_id
    """, (current_user["id_user"], current_user["id_user"]))
    rows = cur.fetchall()
    cur.close()
    return [ProjectOut(
        id=r["project_id"],
        name=r["project_name"],
        description=r["description"] or "",
        status="active",
        type="team" if r["team_id"] else "personal",
        team_id=r["team_id"],
        team_name=r["team_name"],
        category_id=r["category_id"],
        client_id=r["client_id"],
        author_id=r["author_id"]
    ) for r in rows]

@router.put("/projects/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project: ProjectUpdate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT author_id FROM projects WHERE project_id = %s", (project_id,))
    existing = cur.fetchone()
    if not existing:
        raise HTTPException(404, "Проект не найден")
    if existing["author_id"] != current_user["id_user"]:
        raise HTTPException(403, "Изменять проект может только его автор")
    fields = project.model_fields_set
    _check_category_client(cur, current_user,
                           project.category_id if "category_id" in fields else None,
                           project.client_id if "client_id" in fields else None)
    updates, params = [], []
    if project.name is not None:
        updates.append("project_name = %s"); params.append(project.name)
    if project.description is not None:
        updates.append("description = %s"); params.append(project.description)
    if "category_id" in fields:
        updates.append("category_id = %s"); params.append(project.category_id)
    if "client_id" in fields:
        updates.append("client_id = %s"); params.append(project.client_id)
    if updates:
        params.append(project_id)
        cur.execute(f"UPDATE projects SET {', '.join(updates)} WHERE project_id = %s", params)
        conn.commit()
    cur.execute("""
        SELECT p.project_id, p.project_name, p.description, t.team_id, t.team_name,
               p.category_id, p.client_id, p.author_id
        FROM projects p LEFT JOIN teams t ON p.team_id = t.team_id
        WHERE p.project_id = %s
    """, (project_id,))
    r = cur.fetchone()
    cur.close()
    return ProjectOut(
        id=r["project_id"], name=r["project_name"], description=r["description"] or "",
        status="active", type="team" if r["team_id"] else "personal",
        team_id=r["team_id"], team_name=r["team_name"],
        category_id=r["category_id"], client_id=r["client_id"], author_id=r["author_id"]
    )

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT author_id FROM projects WHERE project_id = %s", (project_id,))
    project = cur.fetchone()
    if not project:
        raise HTTPException(404, "Проект не найден")
    if project["author_id"] != current_user["id_user"]:
        raise HTTPException(403, "Удалить проект может только его автор")
    cur.execute("DELETE FROM notifications WHERE task_id IN (SELECT task_id FROM tasks WHERE task_project_id = %s)", (project_id,))
    cur.execute("DELETE FROM tasks WHERE task_project_id = %s", (project_id,))
    cur.execute("DELETE FROM projects WHERE project_id = %s", (project_id,))
    conn.commit()
    cur.close()
    return {"message": "Project deleted"}


# ========== ЗАДАЧИ ==========

@router.post("/tasks", response_model=TaskOut)
def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    due_date = task.due_date or date.today()
    task_time = task.task_time[:5] if task.task_time else None
    assigned_to = None

    if task.project_id:
        proj = _get_project_for_use(cur, task.project_id, current_user["id_user"])
        if proj["team_id"]:
            _check_assignee(cur, proj["team_id"], task.assigned_to)
            assigned_to = task.assigned_to
    _check_tag(cur, task.tag_id, current_user["id_user"])

    cur.execute(
        """INSERT INTO tasks (task_name, task_description, task_priority, task_status,
           task_project_id, task_autor_id, task_date, task_tag_id, task_time, assigned_to)
           VALUES (%s, %s, %s, 'active', %s, %s, %s, %s, %s, %s)
           RETURNING task_id""",
        (task.title, task.description, task.priority, task.project_id or None,
         current_user["id_user"], due_date, task.tag_id, task_time, assigned_to)
    )
    new_id = cur.fetchone()["task_id"]
    conn.commit()
    result = _fetch_task(cur, new_id)
    cur.close()
    return result

@router.get("/tasks", response_model=List[TaskOut])
def get_tasks(
    current_user: dict = Depends(get_current_user),
    project_id: Optional[int] = None,
    tag_id: Optional[int] = None,
    date: Optional[date] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    priority: Optional[str] = None,
    conn=Depends(get_db)
):
    cur = conn.cursor()
    query = TASK_SELECT + """
               LEFT JOIN projects p ON t.task_project_id = p.project_id
               LEFT JOIN team_members tm ON p.team_id = tm.team_id AND tm.user_id = %s
               WHERE (t.task_autor_id = %s OR t.assigned_to = %s OR tm.user_id IS NOT NULL)"""
    uid = current_user["id_user"]
    params = [uid, uid, uid]
    if project_id:
        query += " AND t.task_project_id = %s"
        params.append(project_id)
    if tag_id:
        query += " AND t.task_tag_id = %s"
        params.append(tag_id)
    if date:
        query += " AND t.task_date::date = %s"
        params.append(date)
    if status:
        query += " AND t.task_status = %s"
        params.append(status)
    if priority:
        query += " AND t.task_priority = %s"
        params.append(priority)
    if search:
        query += " AND (t.task_name ILIKE %s OR t.task_description ILIKE %s)"
        params.extend([f"%{search}%", f"%{search}%"])
    query += " ORDER BY t.task_date ASC, t.task_id DESC"
    cur.execute(query, params)
    rows = cur.fetchall()
    cur.close()
    return [_task_out(r) for r in rows]

def _task_rights(cur, task_id, user_id):
    """Задача и права пользователя на неё: автор, менеджер команды проекта или исполнитель."""
    cur.execute("""SELECT t.task_id, t.task_autor_id, t.assigned_to, p.team_id
                   FROM tasks t LEFT JOIN projects p ON t.task_project_id = p.project_id
                   WHERE t.task_id = %s""", (task_id,))
    task = cur.fetchone()
    if not task:
        raise HTTPException(404, "Задача не найдена")
    is_owner = task["task_autor_id"] == user_id or _member_role(cur, task["team_id"], user_id) == "manager"
    is_assignee = task["assigned_to"] == user_id
    return task, is_owner, is_assignee

@router.put("/tasks/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_update: TaskUpdate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    task, is_owner, is_assignee = _task_rights(cur, task_id, current_user["id_user"])
    fields = task_update.model_fields_set
    if not is_owner:
        if not is_assignee:
            raise HTTPException(403, "Нет прав на изменение этой задачи")
        if fields - {"status"}:
            raise HTTPException(403, "Исполнитель может только отмечать выполнение задачи")

    update_fields = []
    params = []
    if task_update.status is not None:
        update_fields.append("task_status = %s"); params.append(task_update.status)
    if task_update.title is not None:
        update_fields.append("task_name = %s"); params.append(task_update.title)
    if task_update.description is not None:
        update_fields.append("task_description = %s"); params.append(task_update.description)
    if task_update.priority is not None:
        update_fields.append("task_priority = %s"); params.append(task_update.priority)
    if task_update.due_date is not None:
        update_fields.append("task_date = %s"); params.append(task_update.due_date)
    if "tag_id" in fields:
        _check_tag(cur, task_update.tag_id, current_user["id_user"])
        update_fields.append("task_tag_id = %s"); params.append(task_update.tag_id)
    if "task_time" in fields:
        update_fields.append("task_time = %s")
        params.append(task_update.task_time[:5] if task_update.task_time else None)
    if "assigned_to" in fields and task["team_id"]:
        _check_assignee(cur, task["team_id"], task_update.assigned_to)
        update_fields.append("assigned_to = %s"); params.append(task_update.assigned_to)
    if update_fields:
        params.append(task_id)
        cur.execute(f"UPDATE tasks SET {', '.join(update_fields)} WHERE task_id = %s", params)
        conn.commit()
    result = _fetch_task(cur, task_id)
    cur.close()
    return result

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _, is_owner, _ = _task_rights(cur, task_id, current_user["id_user"])
    if not is_owner:
        raise HTTPException(403, "Удалить задачу может только её автор или менеджер команды")
    cur.execute("DELETE FROM notifications WHERE task_id = %s", (task_id,))
    cur.execute("DELETE FROM tasks WHERE task_id = %s", (task_id,))
    conn.commit()
    cur.close()
    return {"message": "Task deleted"}


# ========== КАТЕГОРИИ И ТЕГИ ==========

@router.post("/categories", response_model=CategoryOut)
def create_category(category: CategoryCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO categories (category_name, category_autor_id) VALUES (%s, %s) RETURNING category_id, category_name",
        (category.name, current_user["id_user"])
    )
    new = cur.fetchone()
    conn.commit()
    cur.close()
    return CategoryOut(id=new["category_id"], name=new["category_name"])

@router.get("/categories", response_model=List[CategoryOut])
def get_categories(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT category_id, category_name FROM categories WHERE category_autor_id = %s ORDER BY category_name", (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [CategoryOut(id=r["category_id"], name=r["category_name"]) for r in rows]

@router.delete("/categories/{category_id}")
def delete_category(category_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT category_autor_id FROM categories WHERE category_id = %s", (category_id,))
    cat = cur.fetchone()
    if not cat:
        raise HTTPException(404, "Категория не найдена")
    if cat["category_autor_id"] != current_user["id_user"]:
        raise HTTPException(403, "Это не ваша категория")
    cur.execute("UPDATE projects SET category_id = NULL WHERE category_id = %s", (category_id,))
    cur.execute("DELETE FROM categories WHERE category_id = %s", (category_id,))
    conn.commit()
    cur.close()
    return {"message": "Category deleted"}

@router.post("/tags", response_model=TagOut)
def create_tag(tag: TagCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO tags (tag_name, tag_autor_id) VALUES (%s, %s) RETURNING tag_id, tag_name",
        (tag.name, current_user["id_user"])
    )
    new = cur.fetchone()
    conn.commit()
    cur.close()
    return TagOut(id=new["tag_id"], name=new["tag_name"])

@router.get("/tags", response_model=List[TagOut])
def get_tags(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT tag_id, tag_name FROM tags WHERE tag_autor_id = %s ORDER BY tag_name", (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [TagOut(id=r["tag_id"], name=r["tag_name"]) for r in rows]

@router.delete("/tags/{tag_id}")
def delete_tag(tag_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT tag_autor_id FROM tags WHERE tag_id = %s", (tag_id,))
    tag = cur.fetchone()
    if not tag:
        raise HTTPException(404, "Тег не найден")
    if tag["tag_autor_id"] != current_user["id_user"]:
        raise HTTPException(403, "Это не ваш тег")
    cur.execute("UPDATE tasks SET task_tag_id = NULL WHERE task_tag_id = %s", (tag_id,))
    cur.execute("DELETE FROM tags WHERE tag_id = %s", (tag_id,))
    conn.commit()
    cur.close()
    return {"message": "Tag deleted"}


# ========== КЛИЕНТЫ (только фрилансеры) ==========

@router.post("/clients", response_model=ClientOut)
def create_client(client: ClientCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    if current_user["user_type"] != 2:
        raise HTTPException(403, "Клиенты доступны только фрилансерам")
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO clients (client_name, client_contacts, client_additional, user_id) VALUES (%s, %s, %s, %s) RETURNING client_id, client_name, client_contacts, client_additional",
        (client.name, client.contacts, client.additional, current_user["id_user"])
    )
    new = cur.fetchone()
    conn.commit()
    cur.close()
    return ClientOut(id=new["client_id"], name=new["client_name"], contacts=new["client_contacts"], additional=new["client_additional"])

@router.get("/clients", response_model=List[ClientOut])
def get_clients(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    if current_user["user_type"] != 2:
        return []
    cur = conn.cursor()
    cur.execute("SELECT client_id, client_name, client_contacts, client_additional FROM clients WHERE user_id = %s ORDER BY client_name", (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [ClientOut(id=r["client_id"], name=r["client_name"], contacts=r["client_contacts"], additional=r["client_additional"]) for r in rows]

def _own_client(cur, client_id, user):
    if user["user_type"] != 2:
        raise HTTPException(403, "Клиенты доступны только фрилансерам")
    cur.execute("SELECT user_id FROM clients WHERE client_id = %s", (client_id,))
    existing = cur.fetchone()
    if not existing:
        raise HTTPException(404, "Клиент не найден")
    if existing["user_id"] != user["id_user"]:
        raise HTTPException(403, "Это не ваш клиент")

@router.put("/clients/{client_id}", response_model=ClientOut)
def update_client(client_id: int, client: ClientUpdate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _own_client(cur, client_id, current_user)
    update_fields = []
    params = []
    if client.name is not None:
        update_fields.append("client_name = %s"); params.append(client.name)
    if client.contacts is not None:
        update_fields.append("client_contacts = %s"); params.append(client.contacts)
    if client.additional is not None:
        update_fields.append("client_additional = %s"); params.append(client.additional)
    if update_fields:
        params.append(client_id)
        cur.execute(f"UPDATE clients SET {', '.join(update_fields)} WHERE client_id = %s", params)
        conn.commit()
    cur.execute("SELECT client_id, client_name, client_contacts, client_additional FROM clients WHERE client_id = %s", (client_id,))
    updated = cur.fetchone()
    cur.close()
    return ClientOut(
        id=updated["client_id"],
        name=updated["client_name"],
        contacts=updated["client_contacts"],
        additional=updated["client_additional"]
    )

@router.delete("/clients/{client_id}")
def delete_client(client_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _own_client(cur, client_id, current_user)
    cur.execute("UPDATE projects SET client_id = NULL WHERE client_id = %s", (client_id,))
    cur.execute("DELETE FROM clients WHERE client_id = %s", (client_id,))
    conn.commit()
    cur.close()
    return {"message": "Client deleted"}


# ========== СТАТИСТИКА ==========

# Задачи пользователя: созданные им или назначенные ему
MY_TASKS = "(task_autor_id = %(uid)s OR assigned_to = %(uid)s)"

def _collect_stats(cur, uid):
    cur.execute("""
        SELECT COUNT(DISTINCT p.project_id) AS cnt
        FROM projects p
        LEFT JOIN team_members tm ON p.team_id = tm.team_id AND tm.user_id = %(uid)s
        WHERE p.author_id = %(uid)s OR tm.user_id IS NOT NULL
    """, {"uid": uid})
    total_projects = cur.fetchone()["cnt"] or 0
    cur.execute(f"""
        SELECT COUNT(*) AS total,
               COUNT(*) FILTER (WHERE task_status = 'completed') AS completed,
               COUNT(*) FILTER (WHERE task_status = 'active') AS active,
               COUNT(*) FILTER (WHERE task_date::date = CURRENT_DATE) AS today
        FROM tasks WHERE {MY_TASKS}
    """, {"uid": uid})
    row = cur.fetchone()
    return {
        "total_projects": total_projects,
        "total_tasks": row["total"],
        "completed_tasks": row["completed"],
        "active_tasks": row["active"],
        "today_tasks": row["today"],
    }

@router.get("/stats")
def get_stats(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    stats = _collect_stats(cur, current_user["id_user"])
    cur.close()
    return stats

@router.get("/stats/export")
def export_stats_excel(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    stats = _collect_stats(cur, current_user["id_user"])
    total_projects = stats["total_projects"]
    total_tasks = stats["total_tasks"]
    completed_tasks = stats["completed_tasks"]
    active_tasks = stats["active_tasks"]
    today_tasks = stats["today_tasks"]
    cur.execute(f"SELECT task_priority, COUNT(*) AS cnt FROM tasks WHERE {MY_TASKS} GROUP BY task_priority",
                {"uid": current_user["id_user"]})
    priorities = {r["task_priority"]: r["cnt"] for r in cur.fetchall()}
    cur.close()
    wb = openpyxl.Workbook()
    header_font = Font(name='Arial', bold=True, size=12, color='FFFFFF')
    header_fill = PatternFill(start_color='FF4081', end_color='FF4081', fill_type='solid')
    header_alignment = Alignment(horizontal='center', vertical='center')
    thin_border = Border(
        left=Side(style='thin', color='FFD0D8'),
        right=Side(style='thin', color='FFD0D8'),
        top=Side(style='thin', color='FFD0D8'),
        bottom=Side(style='thin', color='FFD0D8')
    )
    ws = wb.active
    ws.title = "Статистика"
    ws.merge_cells('A1:C1')
    ws['A1'] = "СТАТИСТИКА Focus"
    ws['A1'].font = Font(name='Arial', bold=True, size=18, color='C2185B')
    ws['A1'].alignment = Alignment(horizontal='center')
    headers = ["Показатель", "Значение", "% от задач"]
    for col, h in enumerate(headers, 1):
        cell = ws.cell(row=3, column=col, value=h)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = header_alignment
        cell.border = thin_border
    data = [
        ("Проектов", total_projects, False),
        ("Всего задач", total_tasks, True),
        ("Активных", active_tasks, True),
        ("Выполнено", completed_tasks, True),
        ("На сегодня", today_tasks, True)
    ]
    for i, (label, val, with_pct) in enumerate(data, 4):
        ws.cell(row=i, column=1, value=label).border = thin_border
        ws.cell(row=i, column=2, value=val).border = thin_border
        # Процент от числа задач для строки «Проектов» не имеет смысла
        pct = f"{round(val / total_tasks * 100, 1) if total_tasks > 0 else 0}%" if with_pct else "—"
        ws.cell(row=i, column=3, value=pct).border = thin_border
    chart1 = PieChart()
    chart1.title = "Статусы задач"
    chart1.width = 15
    chart1.height = 10
    ws.cell(row=11, column=1, value="Статус").font = Font(bold=True)
    ws.cell(row=11, column=2, value="Кол-во").font = Font(bold=True)
    ws.cell(row=12, column=1, value="Выполнено")
    ws.cell(row=12, column=2, value=completed_tasks)
    ws.cell(row=13, column=1, value="Активные")
    ws.cell(row=13, column=2, value=active_tasks)
    data_ref = Reference(ws, min_col=2, min_row=11, max_row=13)
    cats_ref = Reference(ws, min_col=1, min_row=12, max_row=13)
    chart1.add_data(data_ref, titles_from_data=True)
    chart1.set_categories(cats_ref)
    ws.add_chart(chart1, "E3")
    chart2 = BarChart()
    chart2.title = "Приоритеты"
    chart2.width = 15
    chart2.height = 10
    ws.cell(row=16, column=1, value="Приоритет").font = Font(bold=True)
    ws.cell(row=16, column=2, value="Кол-во").font = Font(bold=True)
    priority_map = {"high": "Высокий", "medium": "Средний", "low": "Низкий"}
    row = 17
    for key, label in priority_map.items():
        ws.cell(row=row, column=1, value=label)
        ws.cell(row=row, column=2, value=priorities.get(key, 0))
        row += 1
    data_ref2 = Reference(ws, min_col=2, min_row=16, max_row=19)
    cats_ref2 = Reference(ws, min_col=1, min_row=17, max_row=19)
    chart2.add_data(data_ref2, titles_from_data=True)
    chart2.set_categories(cats_ref2)
    ws.add_chart(chart2, "E18")
    ws.column_dimensions['A'].width = 20
    ws.column_dimensions['B'].width = 12
    ws.column_dimensions['C'].width = 12
    output = io.BytesIO()
    wb.save(output)
    output.seek(0)
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=statistics.xlsx"}
    )


# ========== ОТЧЁТЫ ==========

@router.post("/reports", response_model=ReportOut)
def create_report(report: ReportCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    if report.period_end < report.period_start:
        raise HTTPException(400, "Конец периода раньше начала")

    cur = conn.cursor()
    uid = current_user["id_user"]

    if current_user["user_type"] == 1:
        if report.report_type == "project":
            cur.execute("SELECT team_id FROM projects WHERE project_id = %s AND team_id IS NOT NULL", (report.target_id,))
            proj = cur.fetchone()
            if not proj:
                raise HTTPException(400, "Отчёт по проекту можно построить только для командного проекта")
            _require_member(cur, proj["team_id"], uid)
        elif report.report_type == "team":
            _require_member(cur, report.target_id, uid)
        else:
            raise HTTPException(400, "Отчёт по клиенту доступен только фрилансерам")
    else:
        if report.report_type == "project":
            cur.execute("SELECT client_id FROM projects WHERE project_id = %s AND author_id = %s", (report.target_id, uid))
            proj = cur.fetchone()
            if not proj or not proj["client_id"]:
                raise HTTPException(400, "Отчёт можно построить только по проекту, привязанному к клиенту")
        elif report.report_type == "client":
            cur.execute("SELECT 1 FROM clients WHERE client_id = %s AND user_id = %s", (report.target_id, uid))
            if not cur.fetchone():
                raise HTTPException(403, "Это не ваш клиент")
        else:
            raise HTTPException(400, "Отчёт по команде фрилансерам недоступен")

    cur.execute(
        """INSERT INTO reports
           (report_name, report_period_start, report_period_end, report_type, report_target_id, user_id)
           VALUES (%s, %s, %s, %s, %s, %s)
           RETURNING report_id, report_name, report_period_start, report_period_end, report_type, report_target_id, created_at""",
        (report.report_name, report.period_start, report.period_end,
         report.report_type, report.target_id, uid)
    )
    new = cur.fetchone()
    conn.commit()
    cur.close()
    return ReportOut(
        id=new["report_id"],
        report_name=new["report_name"],
        period_start=str(new["report_period_start"]),
        period_end=str(new["report_period_end"]),
        report_type=new["report_type"],
        target_id=new["report_target_id"],
        created_at=str(new["created_at"])
    )

@router.get("/reports", response_model=List[ReportOut])
def get_reports(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("""
        SELECT report_id, report_name, report_period_start, report_period_end,
               report_type, report_target_id, created_at
        FROM reports
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [ReportOut(
        id=r["report_id"], report_name=r["report_name"],
        period_start=str(r["report_period_start"]), period_end=str(r["report_period_end"]),
        report_type=r["report_type"], target_id=r["report_target_id"],
        created_at=str(r["created_at"])
    ) for r in rows]

@router.delete("/reports/{report_id}")
def delete_report(report_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT user_id FROM reports WHERE report_id = %s", (report_id,))
    rep = cur.fetchone()
    if not rep:
        raise HTTPException(404, "Отчёт не найден")
    if rep["user_id"] != current_user["id_user"]:
        raise HTTPException(403, "Это не ваш отчёт")
    cur.execute("DELETE FROM reports WHERE report_id = %s", (report_id,))
    conn.commit()
    cur.close()
    return {"message": "Report deleted"}

REPORT_TASKS = """
    SELECT t.task_name, t.task_description, t.task_priority, t.task_status,
           t.task_date::date AS task_date, tg.tag_name, p.project_name
    FROM tasks t
    LEFT JOIN tags tg ON t.task_tag_id = tg.tag_id
    LEFT JOIN projects p ON t.task_project_id = p.project_id
    WHERE {condition}
      AND t.task_date::date BETWEEN %s AND %s
    ORDER BY t.task_date DESC
"""

@router.get("/reports/{report_id}/download")
def download_report(report_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    uid = current_user["id_user"]
    cur.execute("SELECT * FROM reports WHERE report_id = %s AND user_id = %s", (report_id, uid))
    report = cur.fetchone()
    if not report:
        raise HTTPException(404, "Отчёт не найден")

    period = (report["report_period_start"], report["report_period_end"])
    target = report["report_target_id"]
    rtype = report["report_type"]

    # Повторно проверяем доступ: пользователя могли исключить из команды после создания отчёта
    if rtype == "project":
        cur.execute("SELECT author_id, team_id, project_name FROM projects WHERE project_id = %s", (target,))
        proj = cur.fetchone()
        if proj and proj["author_id"] != uid and not _member_role(cur, proj["team_id"], uid):
            raise HTTPException(403, "Нет доступа к проекту отчёта")
        target_label = f"Проект: {proj['project_name'] if proj else '—'}"
        cur.execute(REPORT_TASKS.format(condition="t.task_project_id = %s"), (target, *period))
    elif rtype == "team":
        if not _member_role(cur, target, uid):
            raise HTTPException(403, "Вы больше не состоите в этой команде")
        cur.execute("SELECT team_name FROM teams WHERE team_id = %s", (target,))
        team = cur.fetchone()
        target_label = f"Команда: {team['team_name'] if team else '—'}"
        cur.execute(REPORT_TASKS.format(condition="p.team_id = %s"), (target, *period))
    else:
        cur.execute("SELECT client_name FROM clients WHERE client_id = %s AND user_id = %s", (target, uid))
        cl = cur.fetchone()
        target_label = f"Клиент: {cl['client_name'] if cl else '—'}"
        cur.execute(REPORT_TASKS.format(condition="p.client_id = %s AND p.author_id = %s"), (target, uid, *period))
    tasks_data = cur.fetchall()
    cur.close()

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Отчет"

    header_font = Font(name='Arial', bold=True, size=11, color='FFFFFF')
    header_fill = PatternFill(start_color='1d1d1f', end_color='1d1d1f', fill_type='solid')
    header_alignment = Alignment(horizontal='center', vertical='center')
    cell_alignment = Alignment(vertical='center', wrap_text=True)
    border = Border(
        left=Side(style='thin', color='CCCCCC'),
        right=Side(style='thin', color='CCCCCC'),
        top=Side(style='thin', color='CCCCCC'),
        bottom=Side(style='thin', color='CCCCCC')
    )

    total = len(tasks_data)
    completed = sum(1 for t in tasks_data if t["task_status"] == "completed")
    active = sum(1 for t in tasks_data if t["task_status"] == "active")
    high = sum(1 for t in tasks_data if t["task_priority"] == "high")
    medium = sum(1 for t in tasks_data if t["task_priority"] == "medium")
    low = sum(1 for t in tasks_data if t["task_priority"] == "low")

    ws.merge_cells('A1:H1')
    ws['A1'] = report["report_name"]
    ws['A1'].font = Font(name='Arial', bold=True, size=16, color='1d1d1f')
    ws['A1'].alignment = Alignment(horizontal='center')

    ws.merge_cells('A2:H2')
    ws['A2'] = f"Период: {report['report_period_start'].strftime('%d.%m.%Y')} — {report['report_period_end'].strftime('%d.%m.%Y')}"
    ws['A2'].alignment = Alignment(horizontal='center')

    ws.merge_cells('A3:H3')
    type_text = {"project": "По проекту", "client": "По клиенту", "team": "По команде"}.get(rtype, rtype)
    ws['A3'] = f"Тип: {type_text}"
    ws['A3'].alignment = Alignment(horizontal='center')

    ws.merge_cells('A4:H4')
    ws['A4'] = target_label
    ws['A4'].alignment = Alignment(horizontal='center')
    row = 6

    headers = ["Название", "Проект", "Приоритет", "Статус", "Дата", "Тег", "Описание"]
    col_widths = [25, 20, 12, 14, 14, 14, 35]

    for col, (header, width) in enumerate(zip(headers, col_widths), 1):
        cell = ws.cell(row=row, column=col, value=header)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = header_alignment
        cell.border = border
        ws.column_dimensions[get_column_letter(col)].width = width
    row += 1

    priority_map = {"low": "Низкий", "medium": "Средний", "high": "Высокий"}
    status_map = {"active": "Активна", "completed": "Выполнена"}

    for task in tasks_data:
        data = [
            task["task_name"],
            task["project_name"] or "—",
            priority_map.get(task["task_priority"], task["task_priority"]),
            status_map.get(task["task_status"], task["task_status"]),
            task["task_date"].strftime('%d.%m.%Y') if task["task_date"] else "—",
            task["tag_name"] or "—",
            task["task_description"] or "—"
        ]
        for col_idx, value in enumerate(data, 1):
            cell = ws.cell(row=row, column=col_idx, value=value)
            cell.font = Font(name='Arial', size=10)
            cell.alignment = cell_alignment
            cell.border = border
        row += 1

    row += 2

    ws.merge_cells('J1:L1')
    ws['J1'] = "СТАТИСТИКА"
    ws['J1'].font = Font(name='Arial', bold=True, size=14, color='1d1d1f')
    ws['J1'].alignment = Alignment(horizontal='center')

    stat_headers = ["Показатель", "Значение", "%"]
    stat_row = 3
    for col, header in enumerate(stat_headers, 10):
        cell = ws.cell(row=stat_row, column=col, value=header)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = header_alignment
        cell.border = border

    stat_data = [
        ("Всего задач", total),
        ("Выполнено", completed),
        ("Активных", active),
        ("Высокий приоритет", high),
        ("Средний приоритет", medium),
        ("Низкий приоритет", low)
    ]

    stat_row += 1
    for label, value in stat_data:
        cell_label = ws.cell(row=stat_row, column=10, value=label)
        cell_label.font = Font(name='Arial', size=10)
        cell_label.border = border

        cell_value = ws.cell(row=stat_row, column=11, value=value)
        cell_value.font = Font(name='Arial', size=10)
        cell_value.alignment = Alignment(horizontal='center')
        cell_value.border = border

        percent = round((value / total * 100), 1) if total > 0 else 0
        cell_pct = ws.cell(row=stat_row, column=12, value=f"{percent}%")
        cell_pct.font = Font(name='Arial', size=10)
        cell_pct.alignment = Alignment(horizontal='center')
        cell_pct.border = border
        stat_row += 1

    if completed > 0 or active > 0:
        ws.merge_cells(f'A{row}:H{row}')
        ws[f'A{row}'] = "СТАТУСЫ ЗАДАЧ"
        ws[f'A{row}'].font = Font(name='Arial', bold=True, size=12)
        ws[f'A{row}'].fill = PatternFill(start_color='F5F5F7', end_color='F5F5F7', fill_type='solid')
        row += 2

        ws.cell(row=row, column=1, value="Статус").font = Font(bold=True)
        ws.cell(row=row, column=2, value="Кол-во").font = Font(bold=True)

        data_row = row + 1
        if completed > 0:
            ws.cell(row=data_row, column=1, value="Выполнено")
            ws.cell(row=data_row, column=2, value=completed)
            data_row += 1
        if active > 0:
            ws.cell(row=data_row, column=1, value="Активные")
            ws.cell(row=data_row, column=2, value=active)
            data_row += 1

        chart = PieChart()
        chart.title = "Статусы задач"
        chart.width = 12
        chart.height = 9

        data_ref = Reference(ws, min_col=2, min_row=row, max_row=data_row-1)
        cats_ref = Reference(ws, min_col=1, min_row=row+1, max_row=data_row-1)
        chart.add_data(data_ref, titles_from_data=True)
        chart.set_categories(cats_ref)

        if len(chart.series) > 0:
            series = chart.series[0]
            idx = 0
            if completed > 0:
                point = DataPoint(idx=idx)
                point.graphicalProperties.solidFill = "16a34a"
                series.data_points.append(point)
                idx += 1
            if active > 0:
                point = DataPoint(idx=idx)
                point.graphicalProperties.solidFill = "e91e63"
                series.data_points.append(point)

        ws.add_chart(chart, f"D{row}")

    ws.column_dimensions['A'].width = 25
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 12
    ws.column_dimensions['D'].width = 14
    ws.column_dimensions['E'].width = 14
    ws.column_dimensions['F'].width = 14
    ws.column_dimensions['G'].width = 35
    ws.column_dimensions['J'].width = 20
    ws.column_dimensions['K'].width = 12
    ws.column_dimensions['L'].width = 12

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    filename = f"report_{report_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


# ========== КОМАНДЫ ==========

def _team_out(r) -> TeamOut:
    return TeamOut(
        team_id=r["team_id"],
        team_name=r["team_name"],
        description=r["description"],
        created_by=r["created_by"],
        created_at=str(r["created_at"])
    )

@router.post("/teams", response_model=TeamOut)
def create_team(team: TeamCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    if current_user["user_type"] == 2:
        raise HTTPException(403, "Фрилансер не может создавать команды")
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO teams (team_name, description, created_by) VALUES (%s, %s, %s) RETURNING team_id, team_name, description, created_by, created_at",
        (team.team_name, team.description, current_user["id_user"])
    )
    new_team = cur.fetchone()
    cur.execute(
        "INSERT INTO team_members (team_id, user_id, role) VALUES (%s, %s, 'manager')",
        (new_team["team_id"], current_user["id_user"])
    )
    conn.commit()
    cur.close()
    return _team_out(new_team)

@router.get("/teams", response_model=List[TeamOut])
def get_teams(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("""
        SELECT t.team_id, t.team_name, t.description, t.created_by, t.created_at
        FROM teams t
        JOIN team_members tm ON t.team_id = tm.team_id
        WHERE tm.user_id = %s
        ORDER BY t.created_at DESC
    """, (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [_team_out(r) for r in rows]

@router.get("/teams/{team_id}", response_model=TeamOut)
def get_team(team_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_member(cur, team_id, current_user["id_user"])
    cur.execute("SELECT * FROM teams WHERE team_id = %s", (team_id,))
    team = cur.fetchone()
    cur.close()
    return _team_out(team)

@router.put("/teams/{team_id}", response_model=TeamOut)
def update_team(team_id: int, team: TeamCreate, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT created_by FROM teams WHERE team_id = %s", (team_id,))
    existing = cur.fetchone()
    if not existing:
        raise HTTPException(404, "Команда не найдена")
    if existing["created_by"] != current_user["id_user"]:
        raise HTTPException(403, "Изменять команду может только её создатель")
    cur.execute(
        "UPDATE teams SET team_name = %s, description = %s WHERE team_id = %s RETURNING *",
        (team.team_name, team.description, team_id)
    )
    updated = cur.fetchone()
    conn.commit()
    cur.close()
    return _team_out(updated)

@router.delete("/teams/{team_id}")
def delete_team(team_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("SELECT created_by FROM teams WHERE team_id = %s", (team_id,))
    team = cur.fetchone()
    if not team:
        raise HTTPException(404, "Команда не найдена")
    if team["created_by"] != current_user["id_user"]:
        raise HTTPException(403, "Удалить команду может только её создатель")
    # Проекты команды остаются у авторов как личные
    cur.execute("UPDATE projects SET team_id = NULL, project_type = 'personal' WHERE team_id = %s", (team_id,))
    cur.execute("DELETE FROM team_members WHERE team_id = %s", (team_id,))
    cur.execute("DELETE FROM notifications WHERE related_team_id = %s", (team_id,))
    cur.execute("DELETE FROM teams WHERE team_id = %s", (team_id,))
    conn.commit()
    cur.close()
    return {"message": "Team deleted"}

@router.get("/teams/{team_id}/members", response_model=List[TeamMemberOut])
def get_team_members(team_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_member(cur, team_id, current_user["id_user"])
    cur.execute("""
        SELECT tm.member_id, tm.user_id, u.username, tm.role, tm.joined_at
        FROM team_members tm
        JOIN users u ON tm.user_id = u.id_user
        WHERE tm.team_id = %s
        ORDER BY tm.role, tm.joined_at
    """, (team_id,))
    rows = cur.fetchall()
    cur.close()
    return [TeamMemberOut(
        member_id=r["member_id"],
        user_id=r["user_id"],
        username=r["username"],
        role=r["role"],
        joined_at=str(r["joined_at"])
    ) for r in rows]

@router.get("/teams/{team_id}/projects")
def get_team_projects(team_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_member(cur, team_id, current_user["id_user"])
    cur.execute("SELECT project_id, project_name, description FROM projects WHERE team_id = %s ORDER BY project_id", (team_id,))
    rows = cur.fetchall()
    cur.close()
    return [{"project_id": r["project_id"], "project_name": r["project_name"], "description": r["description"]} for r in rows]

def _attach_project(cur, team_id, project_id, user_id):
    _require_manager(cur, team_id, user_id, "Добавлять проекты в команду может только менеджер")
    cur.execute("SELECT author_id, team_id FROM projects WHERE project_id = %s", (project_id,))
    proj = cur.fetchone()
    if not proj:
        raise HTTPException(404, "Проект не найден")
    if proj["author_id"] != user_id:
        raise HTTPException(403, "Добавить в команду можно только свой проект")
    if proj["team_id"] == team_id:
        raise HTTPException(400, "Проект уже в этой команде")
    cur.execute("UPDATE projects SET team_id = %s, project_type = 'team' WHERE project_id = %s", (team_id, project_id))

@router.post("/teams/{team_id}/add-existing-project")
def add_existing_project_to_team(team_id: int, project_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _attach_project(cur, team_id, project_id, current_user["id_user"])
    conn.commit()
    cur.close()
    return {"message": "Project added to team and became shared"}

@router.post("/teams/{team_id}/projects")
def add_team_project(team_id: int, project_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _attach_project(cur, team_id, project_id, current_user["id_user"])
    conn.commit()
    cur.execute("SELECT project_name, description FROM projects WHERE project_id = %s", (project_id,))
    p = cur.fetchone()
    cur.close()
    return {"project_id": project_id, "project_name": p["project_name"], "description": p["description"]}

@router.delete("/teams/{team_id}/projects/{project_id}")
def remove_team_project(team_id: int, project_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_manager(cur, team_id, current_user["id_user"], "Убирать проекты из команды может только менеджер")
    cur.execute("SELECT 1 FROM projects WHERE project_id = %s AND team_id = %s", (project_id, team_id))
    if not cur.fetchone():
        raise HTTPException(404, "Проекта нет в этой команде")
    # Проект возвращается автору как личный
    cur.execute("UPDATE projects SET team_id = NULL, project_type = 'personal' WHERE project_id = %s", (project_id,))
    conn.commit()
    cur.close()
    return {"message": "Project removed from team"}

@router.get("/teams/{team_id}/pending-invites")
def get_pending_invites(team_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_member(cur, team_id, current_user["id_user"])
    cur.execute("""
        SELECT n.notification_id, n.user_id, u.username, u.email
        FROM notifications n
        JOIN users u ON n.user_id = u.id_user
        WHERE n.related_team_id = %s AND n.type = 'invite' AND n.is_read = FALSE
    """, (team_id,))
    rows = cur.fetchall()
    cur.close()
    return [{"id": r["notification_id"], "user_id": r["user_id"], "username": r["username"], "email": r["email"]} for r in rows]

@router.post("/teams/{team_id}/members", response_model=TeamMemberOut)
def add_team_member(team_id: int, user_email: str, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_manager(cur, team_id, current_user["id_user"], "Добавлять участников может только менеджер")
    cur.execute("SELECT id_user, username, user_type FROM users WHERE LOWER(email) = LOWER(%s)", (user_email,))
    user_to_add = cur.fetchone()
    if not user_to_add:
        raise HTTPException(404, "Пользователь не найден")
    if user_to_add["user_type"] == 2:
        raise HTTPException(400, "Фрилансера нельзя добавить в команду")
    if _member_role(cur, team_id, user_to_add["id_user"]):
        raise HTTPException(400, "Пользователь уже в команде")
    cur.execute(
        "INSERT INTO team_members (team_id, user_id, role) VALUES (%s, %s, 'member') RETURNING member_id, user_id, role, joined_at",
        (team_id, user_to_add["id_user"])
    )
    new_member = cur.fetchone()
    cur.execute("DELETE FROM notifications WHERE related_team_id = %s AND user_id = %s AND type = 'invite'",
                (team_id, user_to_add["id_user"]))
    conn.commit()
    cur.close()
    return TeamMemberOut(
        member_id=new_member["member_id"],
        user_id=new_member["user_id"],
        username=user_to_add["username"],
        role=new_member["role"],
        joined_at=str(new_member["joined_at"])
    )

@router.put("/teams/{team_id}/members/{user_id}/role")
def update_member_role(team_id: int, user_id: int, role: str, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_manager(cur, team_id, current_user["id_user"], "Менять роли может только менеджер")
    if role not in ["manager", "member"]:
        raise HTTPException(400, "Неизвестная роль")
    cur.execute("SELECT created_by FROM teams WHERE team_id = %s", (team_id,))
    if cur.fetchone()["created_by"] == user_id:
        raise HTTPException(403, "Нельзя изменить роль создателя команды")
    if not _member_role(cur, team_id, user_id):
        raise HTTPException(404, "Участник не найден")
    cur.execute("UPDATE team_members SET role = %s WHERE team_id = %s AND user_id = %s", (role, team_id, user_id))
    conn.commit()
    cur.close()
    return {"message": "Role updated"}

@router.delete("/teams/{team_id}/members/{user_id}")
def remove_team_member(team_id: int, user_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_manager(cur, team_id, current_user["id_user"], "Удалять участников может только менеджер")
    if user_id == current_user["id_user"]:
        raise HTTPException(403, "Нельзя удалить себя из команды")
    if not _member_role(cur, team_id, user_id):
        raise HTTPException(404, "Участник не найден")
    cur.execute("SELECT created_by FROM teams WHERE team_id = %s", (team_id,))
    if cur.fetchone()["created_by"] == user_id:
        raise HTTPException(403, "Нельзя удалить создателя команды")
    cur.execute("DELETE FROM team_members WHERE team_id = %s AND user_id = %s", (team_id, user_id))
    conn.commit()
    cur.close()
    return {"message": "Member removed"}

@router.post("/teams/{team_id}/invite")
def invite_user(team_id: int, user_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _require_manager(cur, team_id, current_user["id_user"], "Приглашать может только менеджер")
    cur.execute("SELECT user_type FROM users WHERE id_user = %s", (user_id,))
    invited_user = cur.fetchone()
    if not invited_user:
        raise HTTPException(404, "Пользователь не найден")
    if invited_user["user_type"] == 2:
        raise HTTPException(400, "Фрилансера нельзя пригласить в команду")
    if _member_role(cur, team_id, user_id):
        raise HTTPException(400, "Пользователь уже в команде")
    cur.execute("""SELECT 1 FROM notifications
                   WHERE user_id = %s AND related_team_id = %s AND type = 'invite' AND is_read = FALSE""",
                (user_id, team_id))
    if cur.fetchone():
        raise HTTPException(400, "Приглашение уже отправлено")
    cur.execute("SELECT team_name FROM teams WHERE team_id = %s", (team_id,))
    team_name = cur.fetchone()["team_name"]
    # Приглашение создаётся всегда: настройка notif_p отключает только напоминания о дедлайнах
    cur.execute(
        "INSERT INTO notifications (user_id, message, type, related_team_id) VALUES (%s, %s, 'invite', %s)",
        (user_id, f"Вас пригласили в команду «{team_name}»", team_id)
    )
    conn.commit()
    cur.close()
    return {"message": "Invitation sent"}


# ========== УВЕДОМЛЕНИЯ ==========

@router.get("/tasks/deadline-notifications")
def get_deadline_notifications(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    uid = current_user["id_user"]
    cur.execute("SELECT notif_p FROM users WHERE id_user = %s", (uid,))
    user = cur.fetchone()
    if not user or user["notif_p"] != 1:
        cur.close()
        return {"notifications_created": 0}
    # Напоминание о задачах, время которых наступило за последние 2 минуты
    # (страница опрашивает сервер каждые 30 секунд)
    cur.execute("""
        SELECT t.task_id, t.task_name, TO_CHAR(t.task_time, 'HH24:MI') AS task_time
        FROM tasks t
        WHERE (t.task_autor_id = %s OR t.assigned_to = %s)
          AND t.task_date::date = CURRENT_DATE
          AND t.task_time IS NOT NULL
          AND t.task_time::time BETWEEN (LOCALTIME - INTERVAL '2 minutes') AND LOCALTIME
          AND t.task_status = 'active'
    """, (uid, uid))
    tasks_today = cur.fetchall()
    notifications_created = 0
    for task in tasks_today:
        cur.execute("""
            SELECT notification_id FROM notifications
            WHERE user_id = %s AND task_id = %s AND type = 'deadline'
        """, (uid, task["task_id"]))
        if not cur.fetchone():
            time_val = task["task_time"] or "00:00"
            message = f"⏰ В {time_val} задача «{task['task_name']}»"
            cur.execute("""
                INSERT INTO notifications (user_id, message, type, task_id, is_read)
                VALUES (%s, %s, 'deadline', %s, FALSE)
            """, (uid, message, task["task_id"]))
            notifications_created += 1
    conn.commit()
    cur.close()
    return {"notifications_created": notifications_created}

@router.get("/notifications")
def get_notifications(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute("""
        SELECT n.*, t.team_name
        FROM notifications n
        LEFT JOIN teams t ON n.related_team_id = t.team_id
        WHERE n.user_id = %s
        ORDER BY n.created_at DESC
    """, (current_user["id_user"],))
    rows = cur.fetchall()
    cur.close()
    return [{
        "id": r["notification_id"],
        "message": r["message"],
        "is_read": r["is_read"],
        "type": r["type"],
        "team_id": r["related_team_id"],
        "team_name": r.get("team_name"),
        "task_id": r.get("task_id"),
        "created_at": str(r["created_at"])
    } for r in rows]

@router.put("/notifications/read-all")
def mark_all_notifications_read(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    # Непринятые приглашения остаются непрочитанными, иначе пропадут кнопки «Принять/Отклонить»
    cur = conn.cursor()
    cur.execute("UPDATE notifications SET is_read = TRUE WHERE user_id = %s AND is_read = FALSE AND type <> 'invite'",
                (current_user["id_user"],))
    conn.commit()
    cur.close()
    return {"message": "All notifications marked as read"}

@router.put("/notifications/{notification_id}/read")
def mark_notification_read(notification_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute(
        "UPDATE notifications SET is_read = TRUE WHERE notification_id = %s AND user_id = %s AND type <> 'invite'",
        (notification_id, current_user["id_user"])
    )
    conn.commit()
    cur.close()
    return {"message": "Marked as read"}

@router.delete("/notifications/delete-all")
def delete_all_notifications(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute(
        "DELETE FROM notifications WHERE user_id = %s",
        (current_user["id_user"],)
    )
    conn.commit()
    cur.close()
    return {"message": "All notifications deleted"}

@router.delete("/notifications/{notification_id}/delete")
def delete_notification(notification_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    cur.execute(
        "DELETE FROM notifications WHERE notification_id = %s AND user_id = %s",
        (notification_id, current_user["id_user"])
    )
    conn.commit()
    cur.close()
    return {"message": "Deleted"}

def _own_invite(cur, notification_id, user_id):
    cur.execute("SELECT * FROM notifications WHERE notification_id = %s AND user_id = %s", (notification_id, user_id))
    notif = cur.fetchone()
    if not notif:
        raise HTTPException(404, "Уведомление не найдено")
    if notif["type"] != "invite" or not notif["related_team_id"]:
        raise HTTPException(400, "Это не приглашение в команду")
    return notif

@router.post("/notifications/{notification_id}/accept")
def accept_invite(notification_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    notif = _own_invite(cur, notification_id, current_user["id_user"])
    if not _member_role(cur, notif["related_team_id"], current_user["id_user"]):
        cur.execute("INSERT INTO team_members (team_id, user_id, role) VALUES (%s, %s, 'member')",
                    (notif["related_team_id"], current_user["id_user"]))
    cur.execute("UPDATE notifications SET is_read = TRUE WHERE notification_id = %s", (notification_id,))
    conn.commit()
    cur.close()
    return {"message": "Accepted"}

@router.post("/notifications/{notification_id}/reject")
def reject_invite(notification_id: int, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    cur = conn.cursor()
    _own_invite(cur, notification_id, current_user["id_user"])
    cur.execute("DELETE FROM notifications WHERE notification_id = %s", (notification_id,))
    conn.commit()
    cur.close()
    return {"message": "Invitation rejected"}

@router.get("/users/search")
def search_users(q: str, current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    q = q.strip()
    if len(q) < 2:
        return []
    cur = conn.cursor()
    # В команды можно приглашать только обычных пользователей, фрилансеров в поиске не показываем
    cur.execute("""
        SELECT id_user, username, email
        FROM users
        WHERE (email ILIKE %s OR username ILIKE %s)
          AND id_user != %s AND user_type = 1
        ORDER BY username
        LIMIT 10
    """, (f"%{q}%", f"%{q}%", current_user["id_user"]))
    rows = cur.fetchall()
    cur.close()
    return [{"id": r["id_user"], "username": r["username"], "email": r["email"]} for r in rows]
