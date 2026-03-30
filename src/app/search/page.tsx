import Link from "next/link";
import { Badge } from "@/components/Badge";
import { SearchBar } from "@/components/SearchBar";
import { searchTranscriptLibrary, type SearchMatchSource } from "@/modules/search";

export const dynamic = "force-dynamic";

const sourceCopy: Record<
  SearchMatchSource,
  { label: string; tone: "neutral" | "quiet" | "amber" }
> = {
  transcript: { label: "Transcript", tone: "quiet" },
  takeaway: { label: "Takeaway", tone: "amber" },
  "action-item": { label: "Action Item", tone: "amber" },
  "notable-point": { label: "Notable Point", tone: "neutral" },
};

function pickQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightSnippet(snippet: string, query: string) {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) return snippet;

  const regex = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  const normalizedTokens = new Set(tokens.map((token) => token.toLowerCase()));
  return snippet.split(regex).map((part, index) =>
    normalizedTokens.has(part.toLowerCase()) ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-[0.35rem] bg-[var(--accent)]/16 px-1 py-0.5 text-[var(--ink)]"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = pickQuery(params.q).trim();
  const results = query.length >= 2 ? searchTranscriptLibrary(query) : [];

  return (
    <div className="space-y-8 pb-16">
      <section className="space-y-5 pt-4">
        <div className="space-y-3">
          <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
            Search the transcript library
          </h1>
          <p className="max-w-3xl text-[15px] leading-relaxed text-[var(--muted)]">
            Search exact ideas across raw transcript text, AI takeaways, action items, and notable
            points. Use this when you remember the idea but not the video title.
          </p>
        </div>

        <SearchBar variant="hero" autoFocus className="max-w-4xl" defaultQuery={query} />

        {query.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Try a phrase like{" "}
            <span className="font-medium text-[var(--ink)]">cloudflare tunnel</span>,{" "}
            <span className="font-medium text-[var(--ink)]">vector database</span>, or{" "}
            <span className="font-medium text-[var(--ink)]">retry queue</span>.
          </p>
        ) : query.length < 2 ? (
          <p className="text-sm text-[var(--muted)]">
            Enter at least two characters so the results stay useful.
          </p>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Found <span className="font-semibold text-[var(--ink)]">{results.length}</span>{" "}
            {results.length === 1 ? "result" : "results"} for{" "}
            <span className="font-semibold text-[var(--ink)]">&quot;{query}&quot;</span>.
          </p>
        )}
      </section>

      {query.length >= 2 && results.length === 0 && (
        <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            No matches yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Try a shorter phrase, a synonym, or a more distinctive noun from the transcript or
            analysis output.
          </p>
        </section>
      )}

      {results.length > 0 && (
        <section className="space-y-5">
          <div className="grid gap-4">
            {results.map((result) => (
              <article
                key={result.videoId}
                className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Link
                        href={`/video/${encodeURIComponent(result.videoId)}`}
                        className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)] transition hover:text-[var(--accent)]"
                      >
                        {result.title}
                      </Link>
                      <p className="text-sm text-[var(--muted)]">
                        {result.channel} / {result.publishedDate || "Undated"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge tone="quiet">{result.topic}</Badge>
                      {result.hasInsight && <Badge tone="amber">Analysis Ready</Badge>}
                      {result.matchedSources.map((source) => (
                        <Badge key={source} tone={sourceCopy[source].tone}>
                          {sourceCopy[source].label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/video/${encodeURIComponent(result.videoId)}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                  >
                    Open video
                  </Link>
                </div>

                <div className="mt-5 grid gap-3">
                  {result.matches.map((match, index) => (
                    <div
                      key={`${match.source}-${index}`}
                      className="rounded-2xl border border-[var(--line)] bg-white/65 p-4"
                    >
                      <div className="text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
                        {sourceCopy[match.source].label}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                        {highlightSnippet(match.snippet, query)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
