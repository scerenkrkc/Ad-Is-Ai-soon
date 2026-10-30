"""Çıkarılan transkript metnini ders eşleştirme ve ön değerlendirme için hazırlar."""


def analyze_transcript(text: str) -> dict:
    if not text.strip():
        raise ValueError("Analiz için metin gerekli.")
    raise NotImplementedError("Transkript analiz modeli henüz bağlanmadı.")
