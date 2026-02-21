export type CuratedInsight = {
  summary?: string;
  takeaways?: string[];
  notablePoints?: string[];
  actionItems?: string[];
};

function normalize(md: string) {
  return md.replace(/\r/g, "").trim();
}

function pickSection(md: string, heading: RegExp) {
  const src = normalize(md);
  const lines = src.split("\n");

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (heading.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i].trim())) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end).join("\n").trim() || null;
}

function stripMd(s: string) {
  return s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();
}

function bulletsFrom(section: string | null): string[] {
  if (!section) return [];

  const out: string[] = [];
  for (const raw of section.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const m = line.match(/^(-|\*|\d+\.)\s+(.*)$/);
    if (m) {
      out.push(stripMd(m[2]));
      continue;
    }

    // If the section is written as paragraphs, treat each non-empty line as a point.
    // (We’ll de-dupe later.)
    if (!/^```/.test(line)) {
      out.push(stripMd(line));
    }
  }

  return Array.from(new Set(out)).filter(Boolean);
}

function paragraphFrom(section: string | null): string | null {
  if (!section) return null;
  const cleaned = stripMd(section)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paras = cleaned
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paras[0] || null;
}

/**
 * Curate the raw YouTubeAnalyzer markdown into UI-friendly pieces.
 * This is intentionally heuristic: the report structure is *mostly* stable,
 * but we favor “useful now” over perfect parsing.
 */
export function curateYouTubeAnalyzer(md: string): CuratedInsight {
  const summarySec =
    pickSection(md, /^#{1,6}\s+summary\b/i) ??
    pickSection(md, /^#{1,6}\s+executive summary\b/i);

  const takeawaysSec =
    pickSection(md, /^#{1,6}\s+key takeaways\b/i) ??
    pickSection(md, /^#{1,6}\s+takeaways\b/i);

  const notableSec =
    pickSection(md, /^#{1,6}\s+notable points\b/i) ??
    pickSection(md, /^#{1,6}\s+notable\b/i);

  const actionSec =
    pickSection(md, /^#{1,6}\s+action items\b/i) ??
    pickSection(md, /^#{1,6}\s+actions\b/i) ??
    pickSection(md, /^#{1,6}\s+next steps\b/i);

  const summary = paragraphFrom(summarySec) ?? paragraphFrom(md);

  const takeaways = bulletsFrom(takeawaysSec).slice(0, 8);
  const notablePoints = bulletsFrom(notableSec).slice(0, 10);
  const actionItems = bulletsFrom(actionSec).slice(0, 10);

  return {
    summary: summary || undefined,
    takeaways: takeaways.length ? takeaways : undefined,
    notablePoints: notablePoints.length ? notablePoints : undefined,
    actionItems: actionItems.length ? actionItems : undefined,
  };
}
