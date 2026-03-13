import fs from "node:fs";
import path from "node:path";
import { rebuildCatalogFromCsv } from "../src/lib/catalog-import.ts";
import { catalogCsvPath } from "../src/lib/catalog.ts";
import { catalogDbPath } from "../src/lib/catalog-db.ts";

const args = new Set(process.argv.slice(2));

function loadLocalEnvDefaults() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, value] = match;
    if (process.env[key] !== undefined) {
      continue;
    }

    let normalized = value.trim();
    if (
      (normalized.startsWith('"') && normalized.endsWith('"')) ||
      (normalized.startsWith("'") && normalized.endsWith("'"))
    ) {
      normalized = normalized.slice(1, -1);
    }

    process.env[key] = normalized;
  }
}

loadLocalEnvDefaults();

function safeCatalogCsvPath(): string | undefined {
  try {
    return catalogCsvPath();
  } catch {
    return undefined;
  }
}

function safeCatalogDbPath(): string | undefined {
  try {
    return catalogDbPath();
  } catch {
    return undefined;
  }
}

try {
  const result = rebuildCatalogFromCsv({
    checkOnly: args.has("--check"),
  });

  console.log(
    JSON.stringify(
      {
        status: args.has("--check") ? "validated" : "rebuilt",
        csvPath: result.csvPath,
        liveDbPath: result.liveDbPath,
        validationReportPath: result.validationReportPath,
        catalogVersion: result.catalogVersion,
        videoCount: result.videoCount,
        partCount: result.partCount,
      },
      null,
      2,
    ),
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    JSON.stringify(
      {
        status: "failed",
        csvPath: safeCatalogCsvPath(),
        liveDbPath: safeCatalogDbPath(),
        error: message,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}
