export const matchStatuses = [
  "Yüksek benzerlik",
  "Kısmi eşleşme",
  "Elle kontrol",
  "Eşleşme yok",
] as const;

export type MatchStatus = (typeof matchStatuses)[number];

export type CourseMatch = {
  course: string;
  match: string;
  status: MatchStatus;
  score: number;
};

export type AnalysisResponse = {
  fileName: string;
  courses: CourseMatch[];
};
