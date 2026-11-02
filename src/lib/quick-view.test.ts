import { describe, expect, it } from "vitest";
import { toCompactProviderLabel } from "./quick-view";
import type { ProviderSnapshot } from "./types";

const provider: ProviderSnapshot = {
  id: "antigravity", displayName: "Antigravity", state: "error", usage: null, errorMessage: null,
};

describe("toCompactProviderLabel", () => {
  it("keeps unavailable usage and provider error visible", () => {
    expect(toCompactProviderLabel(provider)).toEqual({
      id: "antigravity", name: "Antigravity", usageLabel: "—", qualityLabel: "Indisponível", stateLabel: "Erro de consulta",
    });
  });

  it("marks estimated metrics", () => {
    expect(toCompactProviderLabel({ ...provider, state: "ready", usage: {
      amount: 10, unit: "percent", period: "today", quality: "estimated", source: "local", updatedAt: "2026-11-02T00:00:00Z",
    } }).qualityLabel).toBe("Estimado");
  });
});
