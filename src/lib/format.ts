import type { UsageMetric, ProviderState } from "./types";

export function formatUsage(metric: UsageMetric | null): string {
  if (!metric || !Number.isFinite(metric.amount)) return "—";
  const value = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(metric.amount);
  if (metric.unit === "percent") return `${value}%`;
  if (metric.unit === "tokens") return `${value} tokens`;
  return `${value} solicitações`;
}

export function qualityLabel(metric: UsageMetric | null): string {
  if (!metric) return "Indisponível";
  return metric.quality === "confirmed" ? "Confirmado" : "Estimado";
}

export function providerStateLabel(state: ProviderState): string {
  switch (state) {
    case "ready": return "Disponível";
    case "loading": return "Verificando";
    case "error": return "Erro de consulta";
    case "not_connected": return "Não conectado";
    case "not_installed": return "Não instalado";
    case "unauthorized": return "Sem autorização";
    case "offline": return "Sem conexão";
  }
}
