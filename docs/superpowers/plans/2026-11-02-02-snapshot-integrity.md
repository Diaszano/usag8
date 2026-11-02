# Provider Snapshot Integrity and Recovery States Implementation Plan

**Execution status:** Complete. Parser validation, independent provider states, safe recovery copy, and the QA evidence are recorded in the SDD ledger.


> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Reject malformed metrics, preserve each provider's independent state and render correct loading/error/no-data messages with no fabricated quotas.

**Architecture:** Keep the Rust command/JSON shape. Add a small defensive parser at the JS boundary and pure view-state selection; retain the existing read-only no-data Rust stub until source approval.

**Tech Stack:** Svelte 5, TypeScript, Vitest, Rust/Serde, Tauri 2.

**Spec:** `docs/superpowers/specs/2026-11-02-snapshot-and-states-design.md`

## Global Constraints
- Do not import real usage, use source-less percentages, or expose secrets.
- Preserve command name `get_dashboard_snapshot` and camelCase contract (`displayName`, `collectedAt`, `errorMessage`, `updatedAt`).
- Existing provider identifiers are `claude-code`, `codex`, `antigravity` (label: Antigravity).
- `null` metric means no valid value, not 0%. Error on one provider cannot blank another.

## Review Focus
1. `NaN`, `Infinity`, negative or >100 percent => unavailable metric — Task 1.
2. Blank/invalid source, period or `updatedAt` => unavailable metric — Task 1.
3. Bad provider payload among good providers => only bad provider becomes error; good provider stays — Task 2.
4. Browser preview or backend failure => safe no-data/retry text; no raw exception leakage — Task 3.
5. `ready` but no quota source => label quota unavailable without treating installation as missing — Task 3.

## File map
- Modify: `src/lib/types.ts`, `src/lib/format.ts`, `src/lib/format.test.ts`, `src/lib/dashboard.ts`, `src/App.svelte`.
- Create: `src/lib/snapshot.ts`, `src/lib/snapshot.test.ts`, `src/lib/provider-view.ts`, `src/lib/provider-view.test.ts`.
- Existing backend: `src-tauri/src/providers.rs`, `src-tauri/src/model.rs` (change only if needed by approved contract).

### Task 1: Metric sanitization

**Files:** Create `src/lib/snapshot.ts`, `src/lib/snapshot.test.ts`; Modify `src/lib/types.ts` if strictly required.

**Interfaces:** Produce `parseUsageMetric(raw: unknown): UsageMetric | null`; use existing `UsageMetric` type. Internal helpers may stay private.

- [x] **Step 1: Write failing tests.** In `src/lib/snapshot.test.ts`, assert valid `{amount:0, unit:'percent', period:'5 h', quality:'confirmed', source:'test fixture', updatedAt:'2026-01-01T00:00:00Z'}` parses; null/non-object, percent 101, amount -1/NaN, missing source, bad timestamp each yield null. Include tokens and requests as nonnegative.
- [x] **Step 2: Confirm RED.** `npm test -- src/lib/snapshot.test.ts`; expected FAIL due to missing `parseUsageMetric`.
- [x] **Step 3: Add minimal parser.** Export `parseUsageMetric(raw: unknown): UsageMetric | null` from `src/lib/snapshot.ts`. Accept only enumerated unit/quality; finite nonnegative numbers; nonempty trimmed string fields; finite valid timestamp; percent <= 100. Preserve exact valid values; return `null` for invalid ones.
- [x] **Step 4: Confirm GREEN.** Run focused Vitest and `npm run check`; expected PASS.
- [x] **Step 5: Commit.** `git add src/lib/snapshot.ts src/lib/snapshot.test.ts src/lib/types.ts && git commit -m "feat: sanitize usage metrics at boundary"`.

### Task 2: Isolated provider normalization

**Files:** Modify `src/lib/snapshot.ts`, `src/lib/snapshot.test.ts`, `src/lib/dashboard.ts`, `src/lib/types.ts`.

**Interfaces:** Produce `parseDashboardSnapshot(raw: unknown): DashboardSnapshot`. Throws `Error('Invalid dashboard snapshot')` only for invalid root; individual provider with valid `id` but malformed fields becomes `{id,displayName, state:'error',usage:null,errorMessage:'Dados do provedor inválidos'}`; provider without nonempty id is skipped. Add states `not_installed | unauthorized | offline` to union, preserving current ones.

- [x] **Step 1: Write RED tests.** Valid root includes two providers: one valid and one invalid usage; parser returns both, good retains metric, bad becomes `error` with null usage. Root `{providers:null}` throws exact safe message. Provider without id is excluded. `ready` with `usage:null` stays `ready`.
- [x] **Step 2: Run RED.** `npm test -- src/lib/snapshot.test.ts`; expected FAIL missing export.
- [x] **Step 3: Implement and wire.** Add parser/export in `snapshot.ts`; call it from `readDashboard()` on both `browserPreview` and `invoke<unknown>('get_dashboard_snapshot')`. Validate state strings, no arbitrary `errorMessage` payloads displayed; replace unsafe errors with fixed safe message.
- [x] **Step 4: Run GREEN.** `npm test -- src/lib/snapshot.test.ts && npm run check`; expected PASS.
- [x] **Step 5: Commit.** `git add src/lib/types.ts src/lib/dashboard.ts src/lib/snapshot.ts src/lib/snapshot.test.ts && git commit -m "feat: isolate invalid provider snapshots"`.

### Task 3: Pure UI state mapping

**Files:** Create `src/lib/provider-view.ts`, `src/lib/provider-view.test.ts`; Modify `src/lib/format.ts` and `src/lib/format.test.ts`.

**Interfaces:** Export `type ProviderViewState = 'loading' | 'not-installed' | 'unauthorized' | 'offline' | 'error' | 'quota-unavailable' | 'not-connected' | 'available'`; `getProviderViewState(provider: ProviderSnapshot): ProviderViewState`. Export `providerStateLabel(state: ProviderState): string` covering newly added states.

- [x] **Step 1: Write failing mapping tests.** Assert `not_installed -> not-installed`, `unauthorized -> unauthorized`, `offline -> offline`, `loading -> loading`, `not_connected -> not-connected`, `error -> error`, `ready + null -> quota-unavailable`, `ready + valid usage -> available`.
- [x] **Step 2: Run RED.** `npm test -- src/lib/provider-view.test.ts`; expected FAIL missing functions.
- [x] **Step 3: Implement mapping.** Use straightforward exhaustive switches; no generic state framework. Add matching Portuguese labels in `format.ts` with test assertions.
- [x] **Step 4: Run GREEN.** `npm test && npm run check`; expected PASS.
- [x] **Step 5: Commit.** `git add src/lib/provider-view.ts src/lib/provider-view.test.ts src/lib/format.ts src/lib/format.test.ts && git commit -m "feat: model explicit provider UI states"`.

### Task 4: Wire safe status and retry to Svelte

**Files:** Modify `src/App.svelte`; Create `src/lib/recovery-copy.ts`, `src/lib/recovery-copy.test.ts`.

**Interfaces:** Export `getRecoveryCopy(state: ProviderViewState): { title: string; description: string; action: string | null }`. `App.svelte` consumes the mapping and keeps `refresh(): Promise<void>`; don't remove working navigation.

- [x] **Step 1: Write RED tests.** `getRecoveryCopy('quota-unavailable')` explains no known quota and never returns '0%'; `unauthorized` does not request pasted tokens; `offline` suggests retry; `loading` has no active retry action; `not-installed` offers verify guidance.
- [x] **Step 2: Run RED.** `npm test -- src/lib/recovery-copy.test.ts`; expected FAIL.
- [x] **Step 3: Implement copy and wire.** Render distinct title/description and contextual action in the details branch of `src/App.svelte`; preserve an app-level safe retry. On error do not log raw error or retain un-timestamped stale data.
- [x] **Step 4: Run GREEN and smoke.** `npm test && npm run check && npm run build` then run `npm run dev` to verify each fixture visually (if test harness cannot inject states, record manual gap; never claim fixture tested).
- [x] **Step 5: Commit.** `git add src/lib/recovery-copy.ts src/lib/recovery-copy.test.ts src/App.svelte && git commit -m "feat: show recoverable provider states"`.

**Exit gate:** Backend still returns no-data only. Real collection remains blocked by source feasibility approval.
