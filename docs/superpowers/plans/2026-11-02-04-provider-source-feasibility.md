# First Provider Source Feasibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Make an evidence-backed **GO/NO-GO** decision for the first permitted read-only provider integration; do not implement a collector before approval.

> Execution tracking: checked boxes mean the action or gate disposition was recorded; they do not imply that a blocked check passed. See the evidence report and SDD ledger.

**Architecture:** Research official documented sources, access scopes and data semantics in a comparison table; approve at most one provider and exact metrics. A separate implementation plan follows only after approval.

**Tech Stack:** Rust future adapter (not yet created); official provider docs, source policy, Linux permissions.

**Spec:** `docs/superpowers/specs/2026-11-02-provider-feasibility-design.md`

## Global Constraints
- Candidates: Claude Code, OpenAI Codex, Antigravity, OpenCode, Cursor; do not presume they have official quota APIs.
- Only read official/public documentation and terms during feasibility; do not inspect local tokens, private account endpoints or secrets.
- Usage, plan limit, subscription quota and token count are different; report unit/window/source/update separately.
- **Antigravity** is displayed; `agy` is its technical command where applicable.

## Review Focus
1. Provider yields token logs but no subscription quota => must mark quota unavailable — Task 1.
2. Official endpoint requires undocumented bearer token reuse => NO-GO — Task 2.
3. Provider CLI missing or offline => integration remains optional and non-blocking — Task 3.
4. Source policy forbids automation => NO-GO, no adapter — Task 2.
5. Other providers fail independently => future integration design must isolate them — Task 4.

## File map
- Create: `docs/research/provider-source-matrix.md`, `docs/research/source-checklist.md`.
- Create: `docs/decisions/ADR-0002-first-provider-source.md`.
- Read: `src-tauri/src/providers.rs`, `src-tauri/src/model.rs`, `src/lib/types.ts`.
- Not yet authorized: any `src-tauri/src/providers/<provider>.rs` adapter or credential parser.

### Task 1: Document candidate sources and metric semantics

**Files:** Create `docs/research/provider-source-matrix.md`.

**Interfaces:** Table columns `provider | source URL | last checked UTC | version | metric | unit | window | quota/reset meaning | official/estimated/unavailable | evidence`.

- [x] **Step 1: Retrieve current official sources.** Visit provider documentation/CLI usage outputs *only if safely available without credentials*; record exact source URLs and versions; use non-authenticated docs first.
- [x] **Step 2: Populate each of five providers.** For each, differentiate session usage, request/token count, quota percentage, renewal and display-only status; write `UNAVAILABLE` for missing facts.
- [x] **Step 3: Validate source claims.** Every `CONFIRMED` entry must have a source and explicit unit/window; downgraded claims are marked estimated/unavailable with method/limitations.
- [x] **Step 4: Commit evidence.** `git diff --check`; `git add docs/research/provider-source-matrix.md && git commit -m "docs: evaluate provider data sources"`.

### Task 2: Security and terms gate

**Files:** Create `docs/research/source-checklist.md`; extend matrix with policy/permissions links.

**Interfaces:** For each candidate: `auth needed`, `allowed automation`, `minimum privileges`, `credential exposure risk`, `rate limits`, `Linux file access`, `network access`, each `PASS/FAIL/UNKNOWN`.

- [x] **Step 1: Examine source terms and rate-limit rules.** Add citations/links and checked dates; do not assume an endpoint is permitted because it is technically reachable.
- [x] **Step 2: Threat model each access path.** Explicitly reject private-token scraping, writable credential files, shell command injection, unintended network requests and logging secrets.
- [x] **Step 3: Review and classify.** `FAIL` on policy or excessive privilege means NO-GO for that source; `UNKNOWN` means block integration until clarified.
- [x] **Step 4: Commit.** `git add docs/research/source-checklist.md docs/research/provider-source-matrix.md && git commit -m "docs: gate provider access and permissions"`.

### Task 3: Offline/no-install resilience design

**Files:** Read `src-tauri/src/providers.rs`, `src-tauri/src/model.rs`; extend `docs/research/source-checklist.md`.

**Interfaces:** Future collector contract (proposal only): `Collector::detect(&self) -> Result<Availability, CollectorError>` and `Collector::collect(&self) -> Result<ProviderSnapshot, CollectorError>`; choose trait only if more than one real implementation needs it, otherwise standalone functions.

- [x] **Step 1: Write explicit test scenarios in research doc.** Missing CLI => not installed; unavailable network => offline; denied permission => unauthorized; unsupported quota => `usage:null` while keeping tool availability independent.
- [x] **Step 2: Specify read-only IO boundary.** Record allowed paths/endpoints and reason; prefer no shell subprocess; if unavoidable, args must not use a shell or expose credentials in process lists.
- [x] **Step 3: Review cost and isolation.** Specify bounded timeouts/polling and that one provider error cannot blank other providers. This is design, not tested runtime behavior.
- [x] **Step 4: Commit the written contract.** `git add docs/research/source-checklist.md && git commit -m "docs: define safe collector failure behavior"`.

### Task 4: Choose one source or stop

**Files:** Create `docs/decisions/ADR-0002-first-provider-source.md`.

**Interfaces:** ADR fields: `Status`, `Source`, `Metric(s)`, `Permission scope`, `Testing fixtures`, `Risks`, `Rejected alternatives`, `Next gate`.

- [x] **Step 1: Apply ranking.** Prefer confirmed official metric + lowest privilege + stable, documented integration. Do not pick provider by popularity alone.
- [x] **Step 2: Declare decision.** Write `Approved for limited read-only spike`, `Deferred` or `Rejected`; if all fail, state **NO-GO** and keep placeholders.
- [x] **Step 3: Gate the next plan.** After user approves the source, invoke `superpowers:writing-plans` with verified endpoint/files, exact parser and fixtures to create a provider-specific implementation plan. **Do not write one with guessed paths.**
- [x] **Step 4: Commit.** `git add docs/decisions/ADR-0002-first-provider-source.md && git commit -m "docs: record first provider feasibility decision"`.

**Exit gate:** No provider integration may begin without source-specific user approval and an ADR.
