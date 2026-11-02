import type { DashboardSnapshot, ProviderSnapshot, ProviderState, UsageMetric } from "./types";

const invalidProviderMessage = "Dados do provedor inválidos";
const providerErrorMessage = "Não foi possível verificar este provedor";

function record(raw: unknown): Record<string, unknown> | null {
  return raw !== null && typeof raw === "object" && !Array.isArray(raw)
    ? raw as Record<string, unknown>
    : null;
}

function isProviderState(state: unknown): state is ProviderState {
  return state === "not_connected" || state === "loading" || state === "ready" || state === "error"
    || state === "not_installed" || state === "unauthorized" || state === "offline";
}

export function parseUsageMetric(raw: unknown): UsageMetric | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const metric = raw as Record<string, unknown>;
  const { amount, unit, period, quality, source, updatedAt } = metric;
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) return null;
  if (unit !== "percent" && unit !== "requests" && unit !== "tokens") return null;
  if (unit === "percent" && amount > 100) return null;
  if (quality !== "confirmed" && quality !== "estimated") return null;
  if (typeof period !== "string" || !period.trim() || typeof source !== "string" || !source.trim()) return null;
  if (typeof updatedAt !== "string" || !updatedAt.trim() || !Number.isFinite(Date.parse(updatedAt))) return null;

  return { amount, unit, period, quality, source, updatedAt };
}

export function parseDashboardSnapshot(raw: unknown): DashboardSnapshot {
  const snapshot = record(raw);
  if (!snapshot || !Array.isArray(snapshot.providers)) {
    throw new Error("Invalid dashboard snapshot");
  }
  const mode = snapshot.mode;
  const collectedAt = snapshot.collectedAt;
  if ((mode !== "prototype" && mode !== "live")
    || !(collectedAt === null
      || (typeof collectedAt === "string" && !!collectedAt.trim() && Number.isFinite(Date.parse(collectedAt))))) {
    throw new Error("Invalid dashboard snapshot");
  }

  const providers: ProviderSnapshot[] = [];
  for (const rawProvider of snapshot.providers) {
    const provider = record(rawProvider);
    if (!provider) continue;
    const id = provider.id;
    if (typeof id !== "string" || !id.trim()) continue;

    const rawDisplayName = provider.displayName;
    const displayName = typeof rawDisplayName === "string" && rawDisplayName.trim() ? rawDisplayName : "Provedor";
    const state = provider.state;
    const usage = provider.usage === null ? null : parseUsageMetric(provider.usage);
    if (typeof rawDisplayName !== "string" || !rawDisplayName.trim() || !isProviderState(state) || !("usage" in provider)
      || (provider.usage !== null && usage === null)
      || !(provider.errorMessage === null || typeof provider.errorMessage === "string")) {
      providers.push({ id, displayName,
        state: "error", usage: null, errorMessage: invalidProviderMessage });
      continue;
    }

    providers.push({ id, displayName, state, usage: state === "error" ? null : usage,
      errorMessage: state === "error" ? providerErrorMessage : null });
  }

  return { providers, collectedAt, mode };
}
