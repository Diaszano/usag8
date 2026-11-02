import { describe, expect, it } from "vitest";
import { getProviderViewState } from "./provider-view";
import type { ProviderSnapshot, UsageMetric } from "./types";

const usage: UsageMetric = {
  amount: 25,
  unit: "percent",
  period: "5 h",
  quality: "confirmed",
  source: "test fixture",
  updatedAt: "2026-01-01T00:00:00Z",
};

function provider(state: ProviderSnapshot["state"], metric: UsageMetric | null = null): ProviderSnapshot {
  return { id: "codex", displayName: "Codex", state, usage: metric, errorMessage: null };
}

describe("getProviderViewState", () => {
  it.each([
    ["loading", "loading"],
    ["not_installed", "not-installed"],
    ["unauthorized", "unauthorized"],
    ["offline", "offline"],
    ["not_connected", "not-connected"],
    ["error", "error"],
  ] as const)("maps %s to %s", (state, expected) => {
    expect(getProviderViewState(provider(state))).toBe(expected);
  });

  it("distinguishes a ready provider with no known quota", () => {
    expect(getProviderViewState(provider("ready"))).toBe("quota-unavailable");
  });

  it("marks a ready provider with a valid metric available", () => {
    expect(getProviderViewState(provider("ready", usage))).toBe("available");
  });
});
