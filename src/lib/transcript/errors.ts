export class TranscriptError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TranscriptError";
    this.status = status;
  }
}

const imageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

const extensionTypes: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

export function resolveMimeType(fileName: string, mimeType: string) {
  if (mimeType === "application/pdf" || imageTypes.has(mimeType)) return mimeType;
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return extensionTypes[extension] ?? "";
}

export function assertReadableText(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length < 20) {
    throw new TranscriptError(
      "Belgeden okunabilir ders metni çıkmadı. Metin katmanı olan bir PDF veya net bir transkript görüntüsü yükleyin.",
      422,
    );
  }
  return normalized.slice(0, 15000);
}
