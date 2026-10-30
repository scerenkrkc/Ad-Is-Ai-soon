"""PDF ve kamera görüntüsünden metin çıkarma. Motor sonraki aşamada bağlanacak."""

from pathlib import Path


def extract_text(file_path: Path) -> str:
    if not file_path.exists():
        raise FileNotFoundError(f"Dosya bulunamadı: {file_path.name}")
    raise NotImplementedError("OCR motoru henüz bağlanmadı.")
