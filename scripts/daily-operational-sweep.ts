import fs from "node:fs";
import path from "node:path";
import { runDailyOperationalSweep } from "../src/lib/daily-operational-sweep.ts";

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

const result = runDailyOperationalSweep({ trigger: "cli" });
const payload = {
  status: result.record.outcome,
  failingPhase: result.record.failingPhase,
  startedAt: result.record.startedAt,
  completedAt: result.record.completedAt,
  manualFollowUpVideoIds: result.record.manualFollowUpVideoIds,
  counts: result.record.counts,
  refresh: result.record.refresh,
  repair: result.record.repair,
  latestRecordPath: result.latestRecordPath,
  archiveRecordPath: result.archiveRecordPath,
};

if (result.record.outcome === "failed") {
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(payload, null, 2));
