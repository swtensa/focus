from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    user_type: int = 1

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
    username: Optional[str] = None
    language: Optional[str] = None
    notif_p: Optional[int] = None

class ProjectCreate(BaseModel):
    name: str
    description: str = ""
    type: str = "personal"
    team_id: Optional[int] = None
    category_id: Optional[int] = None
    client_id: Optional[int] = None

class ProjectOut(BaseModel):
    id: int
    name: str
    description: str
    status: str
    type: str = "personal"
    team_id: Optional[int] = None
    team_name: Optional[str] = None
    category_id: Optional[int] = None
    client_id: Optional[int] = None

class TaskCreate(BaseModel):
    title: str
    description: str = ""
    project_id: Optional[int] = None
    priority: str = "medium"
    due_date: Optional[str] = None
    tag_id: Optional[int] = None
    task_time: Optional[str] = None
    assigned_to: Optional[int] = None

class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    project_id: Optional[int] = None
    due_date: Optional[str] = None
    tag_id: Optional[int] = None
    tag_name: Optional[str] = None
    task_time: Optional[str] = None
    assigned_to: Optional[int] = None
    assigned_to_username: Optional[str] = None

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[str] = None
    tag_id: Optional[int] = None

class CategoryCreate(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str

class TagCreate(BaseModel):
    name: str

class TagOut(BaseModel):
    id: int
    name: str

class ClientCreate(BaseModel):
    name: str
    contacts: str
    additional: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    contacts: Optional[str] = None
    additional: Optional[str] = None

class ClientOut(BaseModel):
    id: int
    name: str
    contacts: str
    additional: Optional[str] = None

class ReportCreate(BaseModel):
    report_name: str
    period_start: str
    period_end: str
    report_type: str
    target_id: int

class ReportOut(BaseModel):
    id: int
    report_name: str
    period_start: str
    period_end: str
    report_type: str
    target_id: int
    created_at: str

class TeamCreate(BaseModel):
    team_name: str
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