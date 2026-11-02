export type View = "dashboard" | "details" | "settings" | "quick-view";
export type NavigationAction = { type: "dashboard" } | { type: "settings" } | { type: "quick-view" } | { type: "provider"; id: string };

const supportedProviderIds = new Set(["claude-code", "codex", "antigravity"]);

export function navigate(current: { view: View; selectedId: string }, action: NavigationAction): { view: View; selectedId: string } {
  switch (action.type) {
    case "dashboard": return { ...current, view: "dashboard" };
    case "settings": return { ...current, view: "settings" };
    case "quick-view": return supportedProviderIds.has(current.selectedId) ? { ...current, view: "quick-view" } : current;
    case "provider": return supportedProviderIds.has(action.id) ? { view: "details", selectedId: action.id } : current;
  }
}
