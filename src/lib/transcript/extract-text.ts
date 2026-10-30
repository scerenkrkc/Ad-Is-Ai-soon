import { extractText } from "unpdf";
import OpenAI from "openai";
import { assertReadableText, resolveMimeType, TranscriptError } from "@/lib/transcript/errors";

const maxBytes = 8 * 1024 * 1024;

function requireClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new TranscriptError(
      "OPENAI_API_KEY tanımlı değil. Anahtarı .env.local dosyasına ekleyip sunucuyu yeniden başlatın.",
      503,
    );
  }
  return new OpenAI({ apiKey });
}

function modelName() {
  return process.env.OPENAI_MODEL || "gpt-4o-mini";
}

async function extractPdfText(bytes: Uint8Array) {
  const { text } = await extractText(bytes, { mergePages: true });
  return text;
}

async function extractImageText(bytes: Uint8Array, mimeType: string) {
  const client = requireClient();
  const completion = await client.chat.completions.create({
    model: modelName(),
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Bu bir üniversite transkripti görüntüsü. Görünen ders kodlarını, ders adlarını, kredileri ve notları satır satır düz metin olarak yaz. Tablo dışı yorum ekleme.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${Buffer.from(bytes).toString("base64")}`,
              detail: "high",
            },
          },
        ],
      },
    ],
  });

  return completion.choices[0]?.message?.content ?? "";
}

export async function extractTranscriptText(file: File) {
  if (file.size <= 0 || file.size > maxBytes) {
    throw new TranscriptError("Dosya boş olamaz ve 8 MB sınırını aşamaz.", 400);
  }

  const mimeType = resolveMimeType(file.name, file.type);
  if (!mimeType) {
    throw new TranscriptError("Yalnızca PDF, PNG, JPEG, WEBP veya GIF yükleyin.", 400);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const text = mimeType === "application/pdf"
    ? await extractPdfText(bytes)
    : await extractImageText(bytes, mimeType);

  return assertReadableText(text);
}
