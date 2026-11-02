import { describe, expect, it } from "vitest";
import { parseUsageMetric } from "./snapshot";

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
