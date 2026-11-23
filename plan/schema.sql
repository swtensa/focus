-- Структура базы данных Focus (PostgreSQL).
-- Создание: psql -U postgres -d taskflow_db -f plan/schema.sql
-- Скрипт можно запускать повторно: существующие таблицы не пересоздаются.

CREATE TABLE IF NOT EXISTS users (
    id_user     SERIAL PRIMARY KEY,
    username    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    user_type   INTEGER NOT NULL DEFAULT 1 CHECK (user_type IN (1, 2)),  -- 1 обычный, 2 фрилансер
    language    VARCHAR(5) NOT NULL DEFAULT 'ru',
    notif_p     INTEGER NOT NULL DEFAULT 1                                -- 1 — получать напоминания
);

CREATE TABLE IF NOT EXISTS teams (
    team_id     SERIAL PRIMARY KEY,
    team_name   VARCHAR(255) NOT NULL,
    description TEXT,
    created_by  INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_members (
    member_id   SERIAL PRIMARY KEY,
    team_id     INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    user_id     INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    role        VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('manager', 'member')),
    joined_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (team_id, user_id)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id        SERIAL PRIMARY KEY,
    category_name      VARCHAR(255) NOT NULL,
    category_autor_id  INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id        SERIAL PRIMARY KEY,
    tag_name      VARCHAR(255) NOT NULL,
    tag_autor_id  INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clients (
    client_id          SERIAL PRIMARY KEY,
    client_name        VARCHAR(255) NOT NULL,
    client_contacts    VARCHAR(255) NOT NULL,
    client_additional  TEXT,
    user_id            INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
    project_id    SERIAL PRIMARY KEY,
    project_name  VARCHAR(255) NOT NULL,
    description   TEXT DEFAULT '',
    author_id     INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    project_type  VARCHAR(20) NOT NULL DEFAULT 'personal' CHECK (project_type IN ('personal', 'team')),
    team_id       INTEGER REFERENCES teams(team_id) ON DELETE SET NULL,
    category_id   INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
    client_id     INTEGER REFERENCES clients(client_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id           SERIAL PRIMARY KEY,
    task_name         VARCHAR(255) NOT NULL,
    task_description  TEXT DEFAULT '',
    task_priority     VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (task_priority IN ('low', 'medium', 'high')),
    task_status       VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (task_status IN ('active', 'completed')),
    task_project_id   INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
    task_autor_id     INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    task_date         DATE,
    task_tag_id       INTEGER REFERENCES tags(tag_id) ON DELETE SET NULL,
    task_time         TIME,
    assigned_to       INTEGER REFERENCES users(id_user) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reports (
    report_id            SERIAL PRIMARY KEY,
    report_name          VARCHAR(255) NOT NULL,
    report_period_start  DATE NOT NULL,
    report_period_end    DATE NOT NULL,
    report_type          VARCHAR(20) NOT NULL CHECK (report_type IN ('project', 'client', 'team')),
    report_target_id     INTEGER NOT NULL,
    user_id              INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    created_at           TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id  SERIAL PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    message          TEXT NOT NULL,
    type             VARCHAR(20) NOT NULL,                 -- invite, deadline
    related_team_id  INTEGER REFERENCES teams(team_id) ON DELETE CASCADE,
    task_id          INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE,
    is_read          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_author ON tasks (task_autor_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks (task_project_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id);
