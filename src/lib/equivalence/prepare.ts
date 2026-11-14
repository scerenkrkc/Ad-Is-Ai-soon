import { formatCatalogForMatching, getCatalog } from "@/lib/catalog/catalog";
import type { CatalogCourse } from "@/lib/catalog/types";

export type ComparisonContext = {
  transcriptText: string;
  catalog: readonly CatalogCourse[];
  catalogPrompt: string;
};

export function prepareComparison(transcriptText: string): ComparisonContext {
  return {
    transcriptText: transcriptText.trim(),
    catalog: getCatalog(),
    catalogPrompt: formatCatalogForMatching(),
  };
}
