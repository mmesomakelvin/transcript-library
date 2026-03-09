/**
 * Owns analysis job execution, status tracking, and insight file paths.
 *
 * @module analysis
 * @see module:lib/analysis
 * @remarks
 * Side effects: file IO, process spawning, process signals.
 * Error behavior: returns booleans/null for expected failures; throws on unexpected IO errors.
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
  structuredAnalysisPath,
  displayAnalysisPath,
  metadataCachePath,
  runMetadataPath,
  atomicWriteJson,
  stdoutLogPath,
  stderrLogPath,
  readRunMetadata,
  type StatusFile,
  type AnalysisMeta,
  type RunFile,
  type AnalysisProvider,
} from "@/lib/analysis";
