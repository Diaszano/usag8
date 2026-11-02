export type ThemePreference = "system" | "dark" | "light";

export function resolveTheme(preference: ThemePreference, systemDark: boolean): "dark" | "light" {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}
