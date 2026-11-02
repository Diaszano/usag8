import { invoke, isTauri } from "@tauri-apps/api/core";
import type { DashboardSnapshot } from "./types";
import { parseDashboardSnapshot } from "./snapshot";

// Preview only when running the Vite page in a regular browser.
// No fabricated usage, credentials, sessions or quota limits.
export const browserPreview: DashboardSnapshot = {
  mode: "prototype",
  collectedAt: null,
  providers: [
    { id: "claude-code", displayName: "Claude Code", state: "not_connected", usage: null, errorMessage: null },
    { id: "codex", displayName: "Codex", state: "not_connected", usage: null, errorMessage: null },
    { id: "antigravity", displayName: "Antigravity", state: "not_connected", usage: null, errorMessage: null },
  ],
};

export async function readDashboard(): Promise<DashboardSnapshot> {
  if (!isTauri()) return parseDashboardSnapshot(browserPreview);
  return parseDashboardSnapshot(await invoke<unknown>("get_dashboard_snapshot"));
}
