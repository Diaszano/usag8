/** Shared read-only presentation contract. Does not contain credentials or local paths. */
export type DataQuality = "confirmed" | "estimated";
export type ProviderState = "not_connected" | "loading" | "ready" | "error" | "not_installed" | "unauthorized" | "offline";
export type UsageUnit = "percent" | "requests" | "tokens";

export interface UsageMetric {
  amount: number;
  unit: UsageUnit;
  period: string;
  quality: DataQuality;
  source: string;
  updatedAt: string;
}

export interface ProviderSnapshot {
  id: string;
  displayName: string;
  state: ProviderState;
  usage: UsageMetric | null;
  errorMessage: string | null;
}

export interface DashboardSnapshot {
  providers: ProviderSnapshot[];
  collectedAt: string | null;
  mode: "prototype" | "live";
}
