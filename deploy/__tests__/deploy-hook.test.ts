/**
 * Tests for the deploy-hook webhook listener.
 *
 * Covers: HMAC signature verification, event filtering, branch filtering,
 * concurrency guard, and request handling.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createHmac } from "node:crypto";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { PassThrough } from "node:stream";
import { EventEmitter } from "node:events";
import { verifySignature, acquireLock, releaseLock, handleWebhook } from "../deploy-hook";
import type { IncomingMessage, ServerResponse } from "node:http";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TEST_SECRET = "test-webhook-secret-1234";

function sign(secret: string, payload: string): string {
  return "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Build a mock IncomingMessage that yields the given body.
 */
function mockRequest(
  method: string,
  headers: Record<string, string>,
  body: string,
): IncomingMessage {
  const stream = new PassThrough() as unknown as IncomingMessage & PassThrough;
  stream.method = method;
  stream.headers = {};
  // Lowercase all header keys (Node convention)
  for (const [k, v] of Object.entries(headers)) {
    stream.headers[k.toLowerCase()] = v;
  }
  // Push body async so the handler can attach listeners first
  process.nextTick(() => {
    stream.push(Buffer.from(body, "utf8"));
    stream.push(null);
  });
  return stream;
}

/**
 * Build a mock ServerResponse that captures status and body.
 */
function mockResponse(): ServerResponse & { _status: number; _body: string } {
  const res = {
    _status: 0,
    _body: "",
    headersSent: false,
    writeHead(status: number) {
      res._status = status;
      res.headersSent = true;
    },
    end(body?: string) {
      res._body = body ?? "";
    },
  } as unknown as ServerResponse & { _status: number; _body: string };
  return res;
}

function pushPayload(ref: string): string {
  return JSON.stringify({ ref, head_commit: { id: "abc123" } });
}

// ---------------------------------------------------------------------------
// Mock child_process.spawn to avoid running the actual deploy script
// ---------------------------------------------------------------------------

vi.mock("node:child_process", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    spawn: vi.fn(() => {
      const child = Object.assign(new EventEmitter(), {
        stdout: new PassThrough(),
        stderr: new PassThrough(),
      });
      // Simulate successful completion
      process.nextTick(() => {
        child.emit("close", 0);
      });
      return child;
    }),
  };
});

// ---------------------------------------------------------------------------
// HMAC Signature Verification
// ---------------------------------------------------------------------------

describe("verifySignature", () => {
  it("accepts a valid signature", () => {
    const payload = Buffer.from("hello world");
    const sig = sign(TEST_SECRET, "hello world");
    expect(verifySignature(TEST_SECRET, payload, sig)).toBe(true);
  });

  it("rejects an invalid signature", () => {
    const payload = Buffer.from("hello world");
    const sig = sign("wrong-secret", "hello world");
    expect(verifySignature(TEST_SECRET, payload, sig)).toBe(false);
  });

  it("rejects a tampered payload", () => {
    const sig = sign(TEST_SECRET, "original");
    expect(verifySignature(TEST_SECRET, Buffer.from("tampered"), sig)).toBe(false);
  });

  it("rejects a truncated signature", () => {
    const payload = Buffer.from("hello");
    expect(verifySignature(TEST_SECRET, payload, "sha256=abc")).toBe(false);
  });

  it("rejects an empty signature", () => {
    const payload = Buffer.from("hello");
    expect(verifySignature(TEST_SECRET, payload, "")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Lock Mechanism
// ---------------------------------------------------------------------------

const LOCK_FILE = "/tmp/transcript-library-deploy.lock";

describe("concurrency lock", () => {
  beforeEach(() => {
    // Clean up any stale lock
    try {
      unlinkSync(LOCK_FILE);
    } catch {
      // fine
    }
  });

  afterEach(() => {
    releaseLock();
  });

  it("acquires lock when none exists", () => {
    expect(acquireLock()).toBe(true);
    expect(existsSync(LOCK_FILE)).toBe(true);
  });

  it("rejects second lock acquisition", () => {
    expect(acquireLock()).toBe(true);
    expect(acquireLock()).toBe(false);
  });

  it("allows reacquisition after release", () => {
    expect(acquireLock()).toBe(true);
    releaseLock();
    expect(acquireLock()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Webhook Handler — Event Filtering
// ---------------------------------------------------------------------------

describe("handleWebhook — event filtering", () => {
  beforeEach(() => {
    releaseLock();
  });

  afterEach(() => {
    releaseLock();
  });

  it("rejects non-POST methods", async () => {
    const req = mockRequest("GET", {}, "");
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(405);
  });

  it("rejects missing signature", async () => {
    const body = pushPayload("refs/heads/main");
    const req = mockRequest("POST", { "x-github-event": "push" }, body);
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(403);
    expect(JSON.parse(res._body).error).toBe("invalid-signature");
  });

  it("rejects invalid signature", async () => {
    const body = pushPayload("refs/heads/main");
    const req = mockRequest(
      "POST",
      {
        "x-github-event": "push",
        "x-hub-signature-256": sign("wrong-secret", body),
      },
      body,
    );
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(403);
  });

  it("ignores non-push events", async () => {
    const body = JSON.stringify({ action: "completed" });
    const sig = sign(TEST_SECRET, body);
    const req = mockRequest(
      "POST",
      {
        "x-github-event": "check_run",
        "x-hub-signature-256": sig,
      },
      body,
    );
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(200);
    expect(JSON.parse(res._body)).toEqual({
      status: "ignored",
      reason: "event-type-check_run",
    });
  });

  it("ignores pushes to non-main branches", async () => {
    const body = pushPayload("refs/heads/develop");
    const sig = sign(TEST_SECRET, body);
    const req = mockRequest(
      "POST",
      {
        "x-github-event": "push",
        "x-hub-signature-256": sig,
      },
      body,
    );
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(200);
    expect(JSON.parse(res._body).reason).toBe("branch-refs/heads/develop");
  });
});

// ---------------------------------------------------------------------------
// Webhook Handler — Deploy Trigger
// ---------------------------------------------------------------------------

describe("handleWebhook — deploy trigger", () => {
  beforeEach(() => {
    releaseLock();
  });

  afterEach(() => {
    releaseLock();
  });

  it("accepts valid push to main and returns 202", async () => {
    const body = pushPayload("refs/heads/main");
    const sig = sign(TEST_SECRET, body);
    const req = mockRequest(
      "POST",
      {
        "x-github-event": "push",
        "x-hub-signature-256": sig,
      },
      body,
    );
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(202);
    expect(JSON.parse(res._body).status).toBe("accepted");
  });

  it("rejects concurrent deploy with 409", async () => {
    // Drain pending nextTick callbacks from previous test's mock spawn close events
    await new Promise((r) => setTimeout(r, 10));

    // Simulate an in-progress deploy by holding the lock file
    writeFileSync(LOCK_FILE, JSON.stringify({ pid: process.pid, ts: new Date().toISOString() }), {
      flag: "w",
    });

    const body = pushPayload("refs/heads/main");
    const sig = sign(TEST_SECRET, body);
    const req = mockRequest("POST", { "x-github-event": "push", "x-hub-signature-256": sig }, body);
    const res = mockResponse();
    await handleWebhook(req, res, TEST_SECRET);
    expect(res._status).toBe(409);
    expect(JSON.parse(res._body).error).toBe("deploy-in-progress");
  });
});
