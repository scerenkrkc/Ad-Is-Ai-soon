"use client";

import { FileUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { primaryButtonClass } from "@/components/ui/styles";
import { roleLabels } from "@/types/user";

export default function PanelPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) router.replace("/giris");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <p className="px-4 py-16 text-center text-sm text-slate-500">Oturum kontrol ediliyor...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-indigo-700">{roleLabels[user.role]}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
        Hoş geldin, {user.fullName}
      </h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Oturum bu tarayıcıda saklanır. Transkript yükleme ekranı belgedeki
        dersleri okuyup hedef katalogla eşleştirir.
      </p>
      <Link href="/transkript" className={`${primaryButtonClass} mt-8`}>
        <FileUp className="h-4 w-4" aria-hidden="true" />
        Transkript Yükle
      </Link>
    </div>
  );
}
