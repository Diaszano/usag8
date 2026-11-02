export type View = "dashboard" | "details" | "settings";
export type NavigationAction = { type: "dashboard" } | { type: "settings" } | { type: "provider"; id: string };

export function navigate(current: { view: View; selectedId: string }, action: NavigationAction): { view: View; selectedId: string } {
  switch (action.type) {
    case "dashboard": return { ...current, view: "dashboard" };
    case "settings": return { ...current, view: "settings" };
    case "provider": return { view: "details", selectedId: action.id };
  }
}
