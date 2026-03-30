import fs from "node:fs";
import { absTranscriptPath, groupVideos, type Video } from "@/lib/catalog";
import { readCuratedInsight } from "@/lib/insights";

export type SearchMatchSource = "transcript" | "takeaway" | "action-item" | "notable-point";

export type SearchMatch = {
  source: SearchMatchSource;
  snippet: string;
};

export type SearchResult = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  hasInsight: boolean;
  matchedSources: SearchMatchSource[];
  matches: SearchMatch[];
};

type SearchOptions = {
  limit?: number;
};

const MIN_QUERY_LENGTH = 2;
const DEFAULT_LIMIT = 24;
const SNIPPET_RADIUS = 90;

const SOURCE_WEIGHT: Record<SearchMatchSource, number> = {
  transcript: 1,
  takeaway: 4,
  "action-item": 5,
  "notable-point": 3,
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripFrontmatter(value: string): string {
  if (!value.startsWith("---")) return value;
  const closingBoundaryIndex = value.indexOf("\n---", 3);
  if (closingBoundaryIndex === -1) return value;
  const afterClosingBoundary = value.indexOf("\n", closingBoundaryIndex + 4);
  return afterClosingBoundary === -1 ? "" : value.slice(afterClosingBoundary + 1);
}

function buildQueryRegex(query: string): RegExp | null {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) return null;
  return new RegExp(tokens.map(escapeRegExp).join("\\s+"), "i");
}

function buildSnippet(text: string, matchIndex: number, matchLength: number): string {
  const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
  const end = Math.min(text.length, matchIndex + matchLength + SNIPPET_RADIUS);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function findTextMatch(source: SearchMatchSource, text: string, regex: RegExp): SearchMatch | null {
  const searchableText = collapseWhitespace(stripFrontmatter(text));
  if (!searchableText) return null;

  const match = regex.exec(searchableText);
  if (!match || typeof match.index !== "number") return null;

  return {
    source,
    snippet: buildSnippet(searchableText, match.index, match[0].length),
  };
}

function readTranscriptBody(video: Video): string {
  return video.parts
    .map((part) => {
      try {
        return fs.readFileSync(absTranscriptPath(part.filePath), "utf8");
      } catch {
        return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function findListMatch(
  source: Exclude<SearchMatchSource, "transcript">,
  items: string[] | undefined,
  regex: RegExp,
): SearchMatch | null {
  if (!items?.length) return null;

  for (const item of items) {
    const match = findTextMatch(source, item, regex);
    if (match) return match;
  }

  return null;
}

function computeScore(matches: SearchMatch[]): number {
  const distinctSources = Array.from(new Set(matches.map((match) => match.source)));
  return (
    distinctSources.reduce((total, source) => total + SOURCE_WEIGHT[source], 0) + matches.length
  );
}

export function searchTranscriptLibrary(
  query: string,
  { limit = DEFAULT_LIMIT }: SearchOptions = {},
): SearchResult[] {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < MIN_QUERY_LENGTH) return [];

  const regex = buildQueryRegex(normalizedQuery);
  if (!regex) return [];

  const results = Array.from(groupVideos().values())
    .map((video) => {
      const transcriptMatch = findTextMatch("transcript", readTranscriptBody(video), regex);
      const insight = readCuratedInsight(video.videoId);
      const takeawayMatch = findListMatch("takeaway", insight.curated?.takeaways, regex);
      const actionItemMatch = findListMatch("action-item", insight.curated?.actionItems, regex);
      const notablePointMatch = findListMatch(
        "notable-point",
        insight.curated?.notablePoints,
        regex,
      );

      const matches = [transcriptMatch, takeawayMatch, actionItemMatch, notablePointMatch].filter(
        (match): match is SearchMatch => Boolean(match),
      );

      if (!matches.length) return null;

      return {
        result: {
          videoId: video.videoId,
          title: video.title,
          channel: video.channel,
          topic: video.topic,
          publishedDate: video.publishedDate,
          hasInsight: insight.source !== "none",
          matchedSources: Array.from(new Set(matches.map((match) => match.source))),
          matches,
        } satisfies SearchResult,
        score: computeScore(matches),
      };
    })
    .filter((entry): entry is { result: SearchResult; score: number } => Boolean(entry))
    .sort((left, right) => {
      if (left.score !== right.score) return right.score - left.score;
      if (left.result.publishedDate !== right.result.publishedDate) {
        return right.result.publishedDate.localeCompare(left.result.publishedDate);
      }
      return left.result.title.localeCompare(right.result.title);
    })
    .slice(0, limit)
    .map((entry) => entry.result);

  return results;
}
