import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { bootstrapCatalogDb } from "@/lib/catalog-db";
import { __resetCatalogSnapshotForTests } from "@/lib/catalog";
import { structuredAnalysisPath } from "@/lib/insight-paths";
import { searchTranscriptLibrary } from "@/lib/search";

const originalPlaylistRepo = process.env.PLAYLIST_TRANSCRIPTS_REPO;
const originalCatalogDbPath = process.env.CATALOG_DB_PATH;
const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;

afterEach(() => {
  __resetCatalogSnapshotForTests();

  if (originalPlaylistRepo === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_REPO = originalPlaylistRepo;
  }

  if (originalCatalogDbPath === undefined) {
    delete process.env.CATALOG_DB_PATH;
  } else {
    process.env.CATALOG_DB_PATH = originalCatalogDbPath;
  }

  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
  } else {
    process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
  }
});

function writeTranscriptFile(repoRoot: string, relativePath: string, content: string): void {
  const fullPath = path.join(repoRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

function writeStructuredInsight(
  insightsBaseDir: string,
  videoId: string,
  payload: {
    title: string;
    takeaways?: string[];
    actionItems?: string[];
    notablePoints?: string[];
  },
): void {
  process.env.INSIGHTS_BASE_DIR = insightsBaseDir;
  fs.mkdirSync(path.dirname(structuredAnalysisPath(videoId)), { recursive: true });
  fs.writeFileSync(
    structuredAnalysisPath(videoId),
    JSON.stringify(
      {
        schemaVersion: 1,
        videoId,
        title: payload.title,
        summary: "Structured search fixture summary.",
        takeaways: payload.takeaways ?? [],
        actionItems: payload.actionItems ?? [],
        notablePoints: payload.notablePoints ?? [],
        reportMarkdown: "# Analysis\n\nStructured search fixture summary.",
      },
      null,
      2,
    ),
  );
}

function seedCatalog(catalogDbPath: string): void {
  const db = bootstrapCatalogDb(catalogDbPath);

  db.prepare(
    `
      INSERT INTO catalog_videos (
        video_id,
        title,
        channel,
        topic,
        published_date,
        ingested_date,
        total_chunks,
        source_row_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    "cloud123ab9",
    "Cloudflare Tunnel Setup",
    "Infra Notes",
    "DevOps",
    "2026-03-01",
    "2026-03-02",
    1,
    1,
  );

  db.prepare(
    `
      INSERT INTO catalog_parts (
        video_id,
        chunk_index,
        word_count,
        file_path
      ) VALUES (?, ?, ?, ?)
    `,
  ).run("cloud123ab9", 1, 160, "youtube-transcripts/topics/devops/cloudflare-tunnel-setup.md");

  db.prepare(
    `
      INSERT INTO catalog_videos (
        video_id,
        title,
        channel,
        topic,
        published_date,
        ingested_date,
        total_chunks,
        source_row_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    "queue123ab9",
    "Retry Queue Architecture",
    "Ops Design",
    "Architecture",
    "2026-02-15",
    "2026-02-16",
    1,
    1,
  );

  db.prepare(
    `
      INSERT INTO catalog_parts (
        video_id,
        chunk_index,
        word_count,
        file_path
      ) VALUES (?, ?, ?, ?)
    `,
  ).run(
    "queue123ab9",
    1,
    140,
    "youtube-transcripts/topics/architecture/retry-queue-architecture.md",
  );

  db.close();
}

describe("searchTranscriptLibrary", () => {
  it("searches transcript body and structured analysis fields with source-specific matches", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "transcript-search-"));
    const playlistRepo = path.join(tmpDir, "playlist-transcripts");
    const catalogDbPath = path.join(tmpDir, "catalog.db");
    const insightsBaseDir = path.join(tmpDir, "insights");

    process.env.PLAYLIST_TRANSCRIPTS_REPO = playlistRepo;
    process.env.CATALOG_DB_PATH = catalogDbPath;
    process.env.INSIGHTS_BASE_DIR = insightsBaseDir;

    seedCatalog(catalogDbPath);

    writeTranscriptFile(
      playlistRepo,
      path.join("youtube-transcripts", "topics", "devops", "cloudflare-tunnel-setup.md"),
      [
        "---",
        'title: "Cloudflare Tunnel Setup"',
        "---",
        "",
        "Cloudflare Tunnel lets you expose an internal dashboard without opening inbound ports.",
      ].join("\n"),
    );

    writeTranscriptFile(
      playlistRepo,
      path.join("youtube-transcripts", "topics", "architecture", "retry-queue-architecture.md"),
      "This session covers retry queue monitoring and failure budgets.",
    );

    writeStructuredInsight(insightsBaseDir, "cloud123ab9", {
      title: "Cloudflare Tunnel Setup",
      actionItems: ["Set up Cloudflare Tunnel for the staging dashboard."],
      takeaways: ["Internal tools can stay private behind a tunnel."],
    });

    writeStructuredInsight(insightsBaseDir, "queue123ab9", {
      title: "Retry Queue Architecture",
      takeaways: ["Retry queue ownership should be explicit."],
      notablePoints: ["Retry queue backpressure affects downstream latency."],
    });

    const cloudflareResults = searchTranscriptLibrary("cloudflare tunnel");
    expect(cloudflareResults).toHaveLength(1);
    expect(cloudflareResults[0]).toMatchObject({
      videoId: "cloud123ab9",
      matchedSources: expect.arrayContaining(["transcript", "action-item"]),
      hasInsight: true,
    });
    expect(cloudflareResults[0].matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "transcript" }),
        expect.objectContaining({ source: "action-item" }),
      ]),
    );

    const retryQueueResults = searchTranscriptLibrary("retry queue");
    expect(retryQueueResults).toHaveLength(1);
    expect(retryQueueResults[0]).toMatchObject({
      videoId: "queue123ab9",
      matchedSources: expect.arrayContaining(["transcript", "takeaway", "notable-point"]),
      hasInsight: true,
    });
  });

  it("ranks structured action-item matches ahead of transcript-only matches", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "transcript-search-"));
    const playlistRepo = path.join(tmpDir, "playlist-transcripts");
    const catalogDbPath = path.join(tmpDir, "catalog.db");
    const insightsBaseDir = path.join(tmpDir, "insights");

    process.env.PLAYLIST_TRANSCRIPTS_REPO = playlistRepo;
    process.env.CATALOG_DB_PATH = catalogDbPath;
    process.env.INSIGHTS_BASE_DIR = insightsBaseDir;

    seedCatalog(catalogDbPath);

    writeTranscriptFile(
      playlistRepo,
      path.join("youtube-transcripts", "topics", "devops", "cloudflare-tunnel-setup.md"),
      "Cloudflare Tunnel is useful for staging dashboards.",
    );
    writeTranscriptFile(
      playlistRepo,
      path.join("youtube-transcripts", "topics", "architecture", "retry-queue-architecture.md"),
      "Cloudflare Tunnel can also front an internal retry queue admin panel.",
    );

    writeStructuredInsight(insightsBaseDir, "cloud123ab9", {
      title: "Cloudflare Tunnel Setup",
      actionItems: ["Set up Cloudflare Tunnel for the staging dashboard."],
    });

    const results = searchTranscriptLibrary("cloudflare tunnel");
    expect(results).toHaveLength(2);
    expect(results[0].videoId).toBe("cloud123ab9");
    expect(results[1].videoId).toBe("queue123ab9");
  });
});
