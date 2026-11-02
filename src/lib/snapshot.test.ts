import { describe, expect, it } from "vitest";
import { parseDashboardSnapshot, parseUsageMetric } from "./snapshot";

const validPercent = {
  amount: 0,
  unit: "percent",
  period: "5 h",
  quality: "confirmed",
  source: "test fixture",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("parseUsageMetric", () => {
  it("preserves a valid zero percent metric", () => {
    expect(parseUsageMetric(validPercent)).toEqual(validPercent);
  });

  it.each([
    null,
    undefined,
    "not an object",
    [],
    { ...validPercent, amount: 101 },
    { ...validPercent, amount: -1 },
    { ...validPercent, amount: Number.NaN },
    { ...validPercent, amount: Number.POSITIVE_INFINITY },
    { ...validPercent, source: " " },
    { ...validPercent, updatedAt: "not a date" },
  ])("rejects an invalid metric: %s", (raw) => {
    expect(parseUsageMetric(raw)).toBeNull();
  });

  it.each(["tokens", "requests"] as const)("accepts nonnegative %s metrics", (unit) => {
    expect(parseUsageMetric({ ...validPercent, amount: 1000, unit })).toMatchObject({ unit, amount: 1000 });
  });
});

describe("parseDashboardSnapshot", () => {
  it("keeps valid providers and isolates a malformed metric", () => {
    const snapshot = parseDashboardSnapshot({
      mode: "prototype",
      collectedAt: null,
      providers: [
        { id: "codex", displayName: "Codex", state: "ready", usage: validPercent, errorMessage: null },
        { id: "antigravity", displayName: "Antigravity", state: "ready", usage: { ...validPercent, amount: 101 }, errorMessage: null },
      ],
    });

    expect(snapshot.providers[0]).toMatchObject({ id: "codex", state: "ready", usage: validPercent });
    expect(snapshot.providers[1]).toEqual({
      id: "antigravity",
      displayName: "Antigravity",
      state: "error",
      usage: null,
      errorMessage: "Dados do provedor inválidos",
    });
  });

  it("rejects an invalid root with a safe error", () => {
    expect(() => parseDashboardSnapshot({ providers: null })).toThrowError("Invalid dashboard snapshot");
  });

  it("skips providers without an id and keeps ready without usage", () => {
    const snapshot = parseDashboardSnapshot({
      mode: "prototype",
      collectedAt: null,
      providers: [
        { displayName: "Sem id", state: "ready", usage: null },
        { id: "claude-code", displayName: "Claude Code", state: "ready", usage: null, errorMessage: null },
      ],
    });

    expect(snapshot.providers).toEqual([
      { id: "claude-code", displayName: "Claude Code", state: "ready", usage: null, errorMessage: null },
    ]);
  });

  it("does not expose a raw provider error", () => {
    const snapshot = parseDashboardSnapshot({
      mode: "prototype",
      collectedAt: null,
      providers: [{ id: "codex", displayName: "Codex", state: "error", usage: null, errorMessage: "token=secret" }],
    });

    expect(snapshot.providers[0].errorMessage).not.toContain("secret");
  });
});
