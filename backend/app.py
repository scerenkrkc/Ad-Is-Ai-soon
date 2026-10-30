"""HTTP giriş noktası. Şablonları sunar, kayıt/giriş ve transkript yükleme uçlarını bağlar."""

from pathlib import Path
from uuid import uuid4

from flask import Flask, redirect, render_template, request, session, url_for
from werkzeug.utils import secure_filename

from backend.auth import authenticate, register_user
from backend.config import Config
from backend.db import init_db
from backend.services.ai_service import analyze_transcript
from backend.services.ocr_service import extract_text

ROOT_DIR = Path(__file__).resolve().parent.parent


def create_app():
    app = Flask(
        __name__,
        template_folder=str(ROOT_DIR / "frontend" / "templates"),
        static_folder=str(ROOT_DIR / "frontend" / "static"),
    )
    app.config.from_object(Config)
    Config.UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
    init_db()

    @app.get("/")
    def giris():
        return render_template("giris.html")

    @app.route("/giris-yap", methods=["GET", "POST"])
    def giris_yap():
        error = None
        if request.method == "POST":
            user, error = authenticate(
                request.form.get("email", ""),
                request.form.get("password", ""),
            )
            if user:
                session["user"] = user
                return redirect(url_for("transkript"))
        return render_template("giris-yap.html", error=error)

    @app.route("/kayit", methods=["GET", "POST"])
    def kayit():
        error = None
        if request.method == "POST":
            password = request.form.get("password", "")
            if password != request.form.get("confirm_password", ""):
                error = "Şifre tekrarı eşleşmiyor."
            else:
                _, error = register_user(
                    request.form.get("full_name", ""),
                    request.form.get("email", ""),
                    password,
                    request.form.get("role", ""),
                )
                if error is None:
                    return redirect(url_for("giris_yap"))
        return render_template("kayit.html", error=error)

    @app.route("/transkript", methods=["GET", "POST"])
    def transkript():
        message = None
        if request.method == "POST":
            upload = request.files.get("transcript")
            filename = secure_filename(upload.filename if upload else "")
            extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
            if not upload or extension not in Config.ALLOWED_EXTENSIONS:
                message = "PDF veya görüntü dosyası seçin."
            else:
                stored_name = f"{uuid4().hex}_{filename}"
                destination = Config.UPLOAD_FOLDER / stored_name
                upload.save(destination)
                try:
                    text = extract_text(destination)
                    analyze_transcript(text)
                    message = "Ön değerlendirme hazır."
                except NotImplementedError:
                    message = f"{stored_name} yüklendi. OCR ve analiz sonraki aşamada bağlanacak."
        return render_template("transkript.html", message=message, user=session.get("user"))

    return app
