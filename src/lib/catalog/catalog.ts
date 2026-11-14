import coursesData from "@/data/courses.json";
import type { CatalogCourse } from "@/lib/catalog/types";

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
    course.content.trim().length > 0
  );
}

const catalog: readonly CatalogCourse[] = (coursesData as unknown[]).filter(isCatalogCourse);

export function getCatalog(): readonly CatalogCourse[] {
  return catalog;
}

export function findCourseByCode(code: string): CatalogCourse | undefined {
  const normalized = code.replace(/\s+/g, "").toUpperCase();
  return catalog.find((course) => course.code.replace(/\s+/g, "").toUpperCase() === normalized);
}

export function formatCatalogForMatching(): string {
  return catalog
    .map(
      (course) =>
        `${course.code} | ${course.name} | Kredi: ${course.credit} | AKTS: ${course.akts} | ${course.content}`,
    )
    .join("\n");
}
