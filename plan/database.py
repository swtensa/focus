import psycopg2
from psycopg2.extras import RealDictCursor

DB_CONFIG = {
    "dbname": "taskflow_db",
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "1234123q"
}

def get_db():
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
    try:
        yield conn
    finally:
        conn.close()