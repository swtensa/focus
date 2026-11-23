import os
from pathlib import Path

import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# .env лежит рядом с кодом, поэтому сервер можно запускать из любой папки
load_dotenv(Path(__file__).resolve().parent / ".env")

DB_CONFIG = {
    "dbname": os.getenv("DB_NAME", "taskflow_db"),
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 5432)),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD"),
}

def get_db():
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
    try:
        yield conn
    finally:
        conn.close()
