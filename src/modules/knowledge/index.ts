/**
 * Module: knowledge
 * Purpose: Own local knowledge-library listing and markdown reads.
 *
 * Public API:
 * - knowledgeExists()
 * - listKnowledgeCategories()
 * - curatedKnowledgeCategories(all)
 * - listKnowledgeMarkdown(category)
 * - readKnowledgeMarkdown(category, relPath)
 * - titleFromRelPath(relPath)
 *
 * Exported IO Types:
 * - none
 *
 * Side Effects:
 * - Reads from local knowledge filesystem.
 *
 * Error Behavior:
 * - Returns null/[] for missing or invalid paths.
 */
export {
  knowledgeExists,
  listKnowledgeCategories,
  curatedKnowledgeCategories,
  listKnowledgeMarkdown,
  readKnowledgeMarkdown,
  titleFromRelPath,
  KNOWLEDGE_ROOT,
} from "@/lib/knowledge";
