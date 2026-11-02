# Snapshot integrity and recovery states — design specification

**Status:** Proposed; can be implemented after the Linux baseline is green.
**Source:** `src/lib/types.ts`, `src/lib/dashboard.ts`, `src/lib/format.ts`, `src-tauri/src/model.rs`, `src-tauri/src/providers.rs`, and Penpot `08 · States & Recovery`.

## Contracts
- Preserve API command `get_dashboard_snapshot` and existing camelCase JSON names.
- Provider identity is stable (`claude-code`, `codex`, `antigravity`). The user-facing name is **Antigravity**; `agy` is a technical command only.
- `ProviderState` extends existing union with `not_installed`, `unauthorized`, `offline`. `not_connected` is not equivalent to `not_installed`; detection must run to claim absence.
- `UsageMetric | null`: `null` means no valid measurement, not 0%.
- A metric is only renderable if amount is finite and nonnegative, percent is <=100, period, source and updatedAt are nonempty, and updatedAt is parseable. A metric must retain `unit`, `period`, `quality` (`confirmed`/`estimated`) and `source`.
- A failed provider never overwrites or conceals another provider. Invalid provider metric is sanitized to `usage:null`, `state:'error'`, with safe error text and no raw payload; structurally invalid root rejects read.
- Provider readiness and quota availability are distinct: `ready` with null `usage` is possible; do not invent a separate quota percent.

## States (Penpot)
- Loading; not installed; offline; unauthorized; unavailable quota; plus generic error and not connected.
- UI label, action and reason are independent of color. Avoid placing credentials in diagnostics.
- In-browser preview never claims a real provider source.
- Retry refresh must preserve last valid provider data only if it is timestamped and labeled stale; otherwise show unavailable.

## Tests and acceptance
- Explicit fixtures for root invalid payload, malformed individual provider, non-finite/negative/over-100 metrics, missing source/timestamp, distinct provider error, and null metric.
- Frontend type checks, Vitest and Rust unit tests green. No runtime provider network calls.
