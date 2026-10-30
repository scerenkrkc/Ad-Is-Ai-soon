export const targetCurriculum = [
  { code: "MAT 101", name: "Analiz I" },
  { code: "MAT 102", name: "Analiz II" },
  { code: "MAT 201", name: "Lineer Cebir" },
  { code: "MAT 202", name: "Diferansiyel Denklemler" },
  { code: "FIZ 101", name: "Fizik I" },
  { code: "FIZ 102", name: "Fizik II" },
  { code: "BIL 101", name: "Programlamaya Giriş" },
  { code: "BIL 102", name: "Nesne Yönelimli Programlama" },
  { code: "BIL 201", name: "Veri Yapıları" },
  { code: "BIL 211", name: "Ayrık Matematik" },
  { code: "BIL 301", name: "Veritabanı Yönetim Sistemleri" },
  { code: "BIL 321", name: "İşletim Sistemleri" },
  { code: "ING 101", name: "İngilizce I" },
  { code: "ING 102", name: "İngilizce II" },
  { code: "TAR 101", name: "Atatürk İlkeleri ve İnkılap Tarihi I" },
  { code: "TUR 101", name: "Türk Dili I" },
] as const;

export function formatCurriculum() {
  return targetCurriculum.map((course) => `${course.code} ${course.name}`).join("\n");
}
