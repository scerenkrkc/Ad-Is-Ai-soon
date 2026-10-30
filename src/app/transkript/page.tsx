import type { Metadata } from "next";
import { UploadPanel } from "@/components/transcript/UploadPanel";

export const metadata: Metadata = {
  title: "Transkript Yükle",
};

export default function TranscriptPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold text-indigo-700">Transkript</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Belgeni yükle, ön değerlendirmeyi gör
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
        PDF veya kamera taraması yükleyin. Metin belgeden okunur, dersler hedef
        katalogla karşılaştırılır ve sonuç tabloya yazılır.
      </p>
      <div className="mt-8">
        <UploadPanel />
      </div>
    </div>
  );
}
