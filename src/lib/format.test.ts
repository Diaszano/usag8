import { describe, expect, it } from "vitest";
import { formatUsage, qualityLabel, providerStateLabel } from "./format";
import type { UsageMetric } from "./types";

const estimated: UsageMetric = {
  amount: 62,
  unit: "percent",
  period: "5 horas",
  quality: "estimated",
  source: "fixture de teste",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("integridade da apresentação", () => {
  it("não inventa percentual na ausência de métrica", () => {
    expect(formatUsage(null)).toBe("—");
    expect(qualityLabel(null)).toBe("Indisponível");
  });
  it("rotula explicitamente estimativas", () => {
    expect(formatUsage(estimated)).toBe("62%");
    expect(qualityLabel(estimated)).toBe("Estimado");
  });
  it("não exibe valores não finitos", () => {
    expect(formatUsage({ ...estimated, amount: Number.NaN })).toBe("—");
  });
  it("diferencia integração ausente de erro", () => {
    expect(providerStateLabel("not_connected")).toBe("Não conectado");
    expect(providerStateLabel("error")).toBe("Erro de consulta");
  });
  it("rotula estados de instalação, autorização e rede separadamente", () => {
    expect(providerStateLabel("not_installed")).toBe("Não instalado");
    expect(providerStateLabel("unauthorized")).toBe("Sem autorização");
    expect(providerStateLabel("offline")).toBe("Sem conexão");
  });
});
