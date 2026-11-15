export const catalogPrograms = ["Endüstriyel Kalıpçılık"] as const;

export type CatalogProgram = (typeof catalogPrograms)[number];

export type CatalogCourse = {
  code: string;
  name: string;
  credit: number;
  akts: number;
  content: string;
  program: CatalogProgram;
};
