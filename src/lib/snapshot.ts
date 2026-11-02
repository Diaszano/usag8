import type { UsageMetric } from "./types";

export function parseUsageMetric(raw: unknown): UsageMetric | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const metric = raw as Record<string, unknown>;
  const { amount, unit, period, quality, source, updatedAt } = metric;
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) return null;
  if (unit !== "percent" && unit !== "requests" && unit !== "tokens") return null;
  if (unit === "percent" && amount > 100) return null;
  if (quality !== "confirmed" && quality !== "estimated") return null;
  if ([period, source, updatedAt].some(value => typeof value !== "string" || !value.trim())) return null;
  if (!Number.isFinite(Date.parse(updatedAt as string))) return null;

  return { amount, unit, period: period as string, quality, source: source as string, updatedAt: updatedAt as string };
}
