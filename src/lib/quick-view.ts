import { formatUsage, providerStateLabel, qualityLabel } from "./format";
import type { ProviderSnapshot } from "./types";

export type CompactProviderLabel = {
  id: string;
  name: string;
  usageLabel: string;
  qualityLabel: string;
  stateLabel: string;
};

export function toCompactProviderLabel(provider: ProviderSnapshot): CompactProviderLabel {
  return {
    id: provider.id,
    name: provider.displayName,
    usageLabel: formatUsage(provider.usage),
    qualityLabel: qualityLabel(provider.usage),
    stateLabel: providerStateLabel(provider.state),
  };
}
