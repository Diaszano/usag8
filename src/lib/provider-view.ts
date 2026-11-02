import type { ProviderSnapshot } from "./types";

export type ProviderViewState = "loading" | "not-installed" | "unauthorized" | "offline" | "error" | "quota-unavailable" | "not-connected" | "available";

export function getProviderViewState(provider: ProviderSnapshot): ProviderViewState {
  switch (provider.state) {
    case "loading": return "loading";
    case "not_installed": return "not-installed";
    case "unauthorized": return "unauthorized";
    case "offline": return "offline";
    case "error": return "error";
    case "not_connected": return "not-connected";
    case "ready": return provider.usage ? "available" : "quota-unavailable";
  }
}
