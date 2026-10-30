import { ArrowRight, FileUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { primaryButtonClass, secondaryButtonClass } from "@/components/ui/styles";

const matches = [
  { source: "MAT101 Kalkülüs I", target: "MAT 101 Analiz I", score: "96%" },
  { source: "FIZ102 Fizik II", target: "FIZ 201 Genel Fizik II", score: "91%" },
  { source: "BIL201 Programlama", target: "CSE 102 Programlamaya Giriş", score: "88%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,70,229,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(37,99,235,0.12),_transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Yapay zeka destekli akademik intibak
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
            Yapay zeka destekli otomatik ders intibakı ve transkript analizi
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Yatay geçiş, dikey geçiş ve çift anadal başvurularında transkriptleri
            okuyun, dersleri anlamsal benzerliğe göre eşleştirin ve komisyona
            sunulacak hızlı bir ön değerlendirme raporu alın.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kayit" className={primaryButtonClass}>
              Hemen Başla
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/transkript" className={secondaryButtonClass}>
              <FileUp className="h-4 w-4" aria-hidden="true" />
              Transkript Yükle
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-indigo-950/10 backdrop-blur">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Ön değerlendirme taslağı</p>
              <p className="text-xs text-slate-500">Yatay geçiş · Örnek eşleşme</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Hazır
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {matches.map((match) => (
              <li
                key={match.source}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{match.source}</p>
                    <p className="mt-1 text-xs text-slate-500">Eşleşen ders: {match.target}</p>
                  </div>
                  <span className="rounded-lg bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                    {match.score}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Bu kart rapor düzeninin örneğidir. Eşleştirme, yüklenen transkript
            üzerinden transkript sayfasında yapılır.
          </p>
        </div>
      </div>
    </section>
  );
}
