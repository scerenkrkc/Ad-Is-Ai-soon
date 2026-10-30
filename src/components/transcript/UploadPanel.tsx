"use client";

import { Camera, FileUp, LoaderCircle } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { primaryButtonClass, secondaryButtonClass } from "@/components/ui/styles";
import type { CourseMatch } from "@/lib/transcript/types";

type Phase = "idle" | "running" | "done" | "error";

export function UploadPanel() {
  const pdfInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<CourseMatch[]>([]);

  async function analyze(file: File) {
    setFileName(file.name);
    setPhase("running");
    setError("");
    setCourses([]);

    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/analyze-transcript", {
        method: "POST",
        body,
      });
      const payload = (await response.json()) as { error?: string; courses?: CourseMatch[] };
      if (!response.ok) {
        setError(payload.error ?? "Analiz tamamlanamadı.");
        setPhase("error");
        return;
      }
      setCourses(payload.courses ?? []);
      setPhase("done");
    } catch {
      setError("Sunucuya ulaşılamadı. Bağlantıyı kontrol edip yeniden deneyin.");
      setPhase("error");
    }
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void analyze(file);
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-3xl border border-dashed border-indigo-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
          {phase === "running" ? (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <FileUp className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
        <h2 className="mt-4 text-lg font-semibold text-slate-950">Transkript ekleyin</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          PDF metni belgeden okunur. Fotoğraf ve kamera taraması görüntü modeli ile
          okunur. Eşleştirme, bilgisayar mühendisliği ders kataloğuna göre yapılır.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className={primaryButtonClass}
            onClick={() => pdfInput.current?.click()}
            disabled={phase === "running"}
          >
            <FileUp className="h-4 w-4" aria-hidden="true" />
            PDF Yükle
          </button>
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={() => cameraInput.current?.click()}
            disabled={phase === "running"}
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Kamera ile Tara
          </button>
        </div>
        <input
          ref={pdfInput}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={onFileChange}
        />
        <input
          ref={cameraInput}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onFileChange}
        />
        {fileName ? (
          <p className="mt-4 text-sm font-medium text-slate-800">Seçilen dosya: {fileName}</p>
        ) : null}
        {phase === "running" ? (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-700" role="status">
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            Yükleniyor... Transkript okunuyor ve dersler eşleştiriliyor.
          </p>
        ) : null}
      </div>

      {phase === "error" ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      {phase === "done" ? (
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-950">Ön değerlendirme raporu</h2>
            <p className="mt-1 text-sm text-slate-500">
              {courses.length > 0
                ? `${fileName} içinde ${courses.length} ders satırı eşleştirildi.`
                : `${fileName} okundu, eşleştirilecek ders satırı bulunamadı.`}
            </p>
          </div>
          {courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Kaynak ders</th>
                    <th className="px-5 py-3 font-medium">Öneri</th>
                    <th className="px-5 py-3 font-medium">Durum</th>
                    <th className="px-5 py-3 font-medium">Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((row, index) => (
                    <tr key={`${row.course}-${index}`} className="border-t border-slate-100">
                      <td className="px-5 py-3 font-medium text-slate-900">{row.course}</td>
                      <td className="px-5 py-3 text-slate-600">{row.match}</td>
                      <td className="px-5 py-3 text-slate-600">{row.status}</td>
                      <td className="px-5 py-3 font-semibold text-indigo-700">{row.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
