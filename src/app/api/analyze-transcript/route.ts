import { NextResponse } from "next/server";
import { analyzeTranscript } from "@/lib/transcript/analyze";
import { extractTranscriptText } from "@/lib/transcript/extract-text";
import { TranscriptError } from "@/lib/transcript/errors";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Transkript dosyası gerekli." }, { status: 400 });
    }

    const text = await extractTranscriptText(file);
    const courses = await analyzeTranscript(text);

    return NextResponse.json({
      fileName: file.name,
      courses,
    });
  } catch (error) {
    if (error instanceof TranscriptError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Transkript işlenemedi." }, { status: 500 });
  }
}
