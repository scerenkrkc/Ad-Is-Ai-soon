import { formatCatalogForMatching, getCatalog } from "@/lib/catalog/catalog";
import type { CatalogCourse, CatalogProgram } from "@/lib/catalog/types";

export type ComparisonContext = {
  transcriptText: string;
  catalog: readonly CatalogCourse[];
  catalogPrompt: string;
};

export function prepareComparison(transcriptText: string, program?: CatalogProgram): ComparisonContext {
  const catalog = getCatalog(program);
  return {
    transcriptText: transcriptText.trim(),
    catalog,
    catalogPrompt: formatCatalogForMatching(catalog),
  };
}
