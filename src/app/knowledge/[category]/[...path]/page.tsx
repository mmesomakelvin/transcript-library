import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { readKnowledgeMarkdown, titleFromRelPath } from "@/lib/knowledge";

function dec(s: string) {
  return decodeURIComponent(s);
}

export default function KnowledgeDocPage({
  params,
}: {
  params: { category: string; path: string[] };
}) {
  const category = dec(params.category);
  const rel = params.path.map(dec).join("/");

  const md = readKnowledgeMarkdown(category, rel);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-black/10 bg-[color:var(--card)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              Knowledge / {category}
            </div>
            <h1 className="mt-1 truncate font-display text-2xl tracking-tight">
              {titleFromRelPath(rel)}
            </h1>
            <div className="mt-2 text-xs text-[var(--muted)]">{rel}</div>
          </div>
          <Link
            href={`/knowledge/${encodeURIComponent(category)}`}
            className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
          >
            Back to {category}
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white/60 p-6">
        {md ? (
          <Markdown>{md}</Markdown>
        ) : (
          <div className="text-sm text-[var(--muted)]">Not found.</div>
        )}
      </div>
    </div>
  );
}
