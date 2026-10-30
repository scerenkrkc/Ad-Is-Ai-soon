"""Kayıt ve giriş. Parola düz metin olarak saklanmaz."""

from werkzeug.security import check_password_hash, generate_password_hash

from backend.db import connect, utc_now

ROLES = {"ogrenci", "komisyon"}


def register_user(full_name: str, email: str, password: str, role: str):
    normalized_email = email.strip().lower()
    if role not in ROLES:
        return None, "Geçerli bir rol seçin."

    with connect() as connection:
        existing = connection.execute(
            "SELECT id FROM users WHERE email = ?",
            (normalized_email,),
        ).fetchone()
        if existing:
            return None, "Bu e-posta adresi ile kayıtlı bir hesap zaten var."

        cursor = connection.execute(
            """
            INSERT INTO users (full_name, email, password_hash, role, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                full_name.strip(),
                normalized_email,
                generate_password_hash(password),
                role,
                utc_now(),
            ),
        )
        return {"id": cursor.lastrowid, "email": normalized_email, "role": role}, None


def authenticate(email: str, password: str):
    with connect() as connection:
        user = connection.execute(
            "SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?",
            (email.strip().lower(),),
        ).fetchone()

    if user is None or not check_password_hash(user["password_hash"], password):
        return None, "E-posta veya şifre hatalı."

    return {
        "id": user["id"],
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user["role"],
    }, None
