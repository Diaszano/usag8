import { describe, expect, it } from "vitest";
import { getRecoveryCopy } from "./recovery-copy";

describe("getRecoveryCopy", () => {
  it("explains that a known quota is unavailable without showing zero", () => {
    const copy = getRecoveryCopy("quota-unavailable");
    expect(`${copy.title} ${copy.description}`).toMatch(/cota|limite/i);
    expect(`${copy.title} ${copy.description}`).not.toContain("0%");
  });

  it("does not ask for pasted credentials when authorization is missing", () => {
    const copy = getRecoveryCopy("unauthorized");
    expect(`${copy.title} ${copy.description}`).not.toMatch(/cole .*token|envie .*credencial/i);
  });

  it("offers a retry when the provider is offline", () => {
    expect(getRecoveryCopy("offline").action).toMatch(/tentar/i);
  });

  it("does not offer a retry while loading", () => {
    expect(getRecoveryCopy("loading").action).toBeNull();
  });

  it("guides the user to verify installation without claiming it was checked", () => {
    const copy = getRecoveryCopy("not-installed");
    expect(copy.description).toMatch(/confirme|verifique/i);
    expect(copy.description).toMatch(/instal/i);
    expect(copy.description).toMatch(/prévia/i);
  });
});
