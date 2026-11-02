import { describe, expect, it } from "vitest";
import { navigate } from "./navigation";

describe("navigate", () => {
  it("opens the selected provider", () => {
    expect(navigate({ view: "dashboard", selectedId: "claude-code" }, { type: "provider", id: "codex" }))
      .toEqual({ view: "details", selectedId: "codex" });
  });

  it("opens settings without losing the selected provider", () => {
    expect(navigate({ view: "details", selectedId: "codex" }, { type: "settings" }))
      .toEqual({ view: "settings", selectedId: "codex" });
  });

  it("returns to the dashboard and retains the selected provider", () => {
    expect(navigate({ view: "details", selectedId: "codex" }, { type: "dashboard" }))
      .toEqual({ view: "dashboard", selectedId: "codex" });
  });
});
