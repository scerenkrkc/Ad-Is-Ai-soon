"""Ortam değişkenleri ve dosya yolları. Gizli değerler .env içinden okunur."""

import os
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "gelistirme-icin-degistirin")
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    DATABASE_PATH = ROOT_DIR / os.getenv("DATABASE_PATH", "data/adis.db")
    UPLOAD_FOLDER = ROOT_DIR / os.getenv("UPLOAD_FOLDER", "uploads")
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "webp"}
