import coursesData from "@/data/courses.json";
import { catalogPrograms, type CatalogCourse, type CatalogProgram } from "@/lib/catalog/types";

function isCatalogProgram(value: unknown): value is CatalogProgram {
  return catalogPrograms.some((program) => program === value);
}

function isCatalogCourse(value: unknown): value is CatalogCourse {
  if (!value || typeof value !== "object") return false;
  const course = value as Partial<CatalogCourse>;
  return (
    typeof course.code === "string" &&
    course.code.trim().length > 0 &&
    typeof course.name === "string" &&
    course.name.trim().length > 0 &&
    typeof course.credit === "number" &&
    typeof course.akts === "number" &&
    typeof course.content === "string" &&
    course.content.trim().length > 0 &&
    isCatalogProgram(course.program)
  );
}

const catalog: readonly CatalogCourse[] = (coursesData as unknown[]).filter(isCatalogCourse);

export function getCatalog(program?: CatalogProgram): readonly CatalogCourse[] {
  if (!program) return catalog;
  return catalog.filter((course) => course.program === program);
}

export function findCourseByCode(code: string): CatalogCourse | undefined {
  const normalized = code.replace(/\s+/g, "").toUpperCase();
  return catalog.find((course) => course.code.replace(/\s+/g, "").toUpperCase() === normalized);
}

export function formatCatalogForMatching(courses: readonly CatalogCourse[] = catalog): string {
  return courses
    .map(
      (course) =>
        `${course.code} | ${course.name} | Program: ${course.program} | Kredi: ${course.credit} | AKTS: ${course.akts} | ${course.content}`,
    )
    .join("\n");
}
