"""SQLite bağlantısı ve tablo kurulumu. Kullanıcı kayıtları data/adis.db dosyasında durur."""

import sqlite3
from datetime import datetime, timezone

from backend.config import Config


def connect():
    Config.DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(Config.DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with connect() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


def utc_now():
    return datetime.now(timezone.utc).isoformat()
