from datetime import date
from typing import Annotated, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, StringConstraints

# Непустая строка без пробелов по краям
Name = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
# Время задачи в формате ЧЧ:ММ
TimeStr = Annotated[str, StringConstraints(strip_whitespace=True, pattern=r"^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$")]
Priority = Literal["low", "medium", "high"]
Status = Literal["active", "completed"]


class UserRegister(BaseModel):
    username: Name
    email: EmailStr
    password: str
    user_type: Literal[1, 2] = 1

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    user_type: int

class TokenOut(BaseModel):
    access_token: str
    token_type: str
    user_type: int

class ProfileUpdate(BaseModel):
    username: Optional[Name] = None
    language: Optional[Literal["ru", "en"]] = None
    notif_p: Optional[Literal[0, 1]] = None

class ProjectCreate(BaseModel):
    name: Name
    description: str = ""
    type: Literal["personal", "team"] = "personal"
    team_id: Optional[int] = None
    category_id: Optional[int] = None
    client_id: Optional[int] = None

class ProjectUpdate(BaseModel):
    name: Optional[Name] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    client_id: Optional[int] = None

class ProjectOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = ""
    status: str
    type: str = "personal"
    team_id: Optional[int] = None
    team_name: Optional[str] = None
    category_id: Optional[int] = None
    client_id: Optional[int] = None
    author_id: Optional[int] = None

class TaskCreate(BaseModel):
    title: Name
    description: str = ""
    project_id: Optional[int] = None
    priority: Priority = "medium"
    due_date: Optional[date] = None
    tag_id: Optional[int] = None
    task_time: Optional[TimeStr] = None
    assigned_to: Optional[int] = None

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = ""
    priority: str
    status: str
    project_id: Optional[int] = None
    due_date: Optional[str] = None
    tag_id: Optional[int] = None
    tag_name: Optional[str] = None
    task_time: Optional[str] = None
    assigned_to: Optional[int] = None
    assigned_to_username: Optional[str] = None
    author_id: Optional[int] = None

class TaskUpdate(BaseModel):
    status: Optional[Status] = None
    title: Optional[Name] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[date] = None
    tag_id: Optional[int] = None
    task_time: Optional[TimeStr] = None
    assigned_to: Optional[int] = None

class CategoryCreate(BaseModel):
    name: Name

class CategoryOut(BaseModel):
    id: int
    name: str

class TagCreate(BaseModel):
    name: Name

class TagOut(BaseModel):
    id: int
    name: str

class ClientCreate(BaseModel):
    name: Name
    contacts: Name
    additional: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[Name] = None
    contacts: Optional[Name] = None
    additional: Optional[str] = None

class ClientOut(BaseModel):
    id: int
    name: str
    contacts: str
    additional: Optional[str] = None

class ReportCreate(BaseModel):
    report_name: Name
    period_start: date
    period_end: date
    report_type: Literal["project", "client", "team"]
    target_id: int = Field(gt=0)

class ReportOut(BaseModel):
    id: int
    report_name: str
    period_start: str
    period_end: str
    report_type: str
    target_id: int
    created_at: str

class TeamCreate(BaseModel):
    team_name: Name
    description: Optional[str] = None

class TeamOut(BaseModel):
    team_id: int
    team_name: str
    description: Optional[str] = None
    created_by: int
    created_at: str

class TeamMemberOut(BaseModel):
    member_id: int
    user_id: int
    username: str
    role: str
    joined_at: str
