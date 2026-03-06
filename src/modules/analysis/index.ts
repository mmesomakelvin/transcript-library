/**
 * Module: analysis
 * Purpose: Own analysis job execution, status tracking, and insight file paths.
 *
 * Public API:
 * - tryAcquireSlot()
 * - decrementRunning()
 * - readStatus(videoId)
 * - isProcessAlive(pid)
 * - isValidVideoId(id)
 * - spawnAnalysis(videoId, meta, transcript, logPrefix?)
 * - insightDir(videoId)
 * - insightsBaseDir()
 * - statusPath(videoId)
 * - analysisPath(videoId)
 * - atomicWriteJson(filePath, obj)
 *
 * Exported IO Types:
 * - StatusFile, AnalysisMeta
 *
 * Side Effects:
 * - File IO, process spawning, process signals.
 *
 * Error Behavior:
 * - Returns booleans/null for expected failures; throws on unexpected IO errors.
 */
export {
  tryAcquireSlot,
  decrementRunning,
  readStatus,
  isProcessAlive,
  isValidVideoId,
  spawnAnalysis,
  insightDir,
  insightsBaseDir,
  statusPath,
  analysisPath,
  atomicWriteJson,
  type StatusFile,
  type AnalysisMeta,
} from "@/lib/analysis";
