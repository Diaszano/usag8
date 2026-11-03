# Provider Source Revalidation and Approval Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes (`- [x]`) for tracking.

**Goal:** Reassess official provider quota/usage sources and deliver one evidence-backed **GO-for-user-review or NO-GO** decision, without implementing or invoking a provider collector.

**Architecture:** Documentation-only research that reuses the existing source matrix, security checklist and `ADR-0002` decision. Revalidate exact provider interfaces, policies, schema stability and data semantics, then append a dated decision. Keep the Rust `not_connected` snapshot and frontend intact.

**Tech Stack:** Official public docs and terms; Markdown; Git; existing Superpowers workflow. **No Rust/TypeScript changes or dependencies.**

**Spec:** `docs/superpowers/specs/2026-11-02-provider-source-revalidation-design.md`

**Status:** Completed 2026-11-02 — **NO-GO — sem integração**. Research completion does not authorize provider access or implementation; see the dated reconsideration in `docs/decisions/ADR-0002-first-provider-source.md`.

## Global Constraints

- Research only: no account or credential access, no provider CLI execution, no authenticated requests and no implementation of collectors.
- Candidates: Claude Code, OpenAI Codex, Antigravity, OpenCode, Cursor. Display name **Antigravity**; `agy` is only its technical command.
- Use current **official public** source URLs and record real UTC lookup time. `UNKNOWN` or `FAIL` on mandatory policy/permission/stability gates blocks adoption.
- Distinguish tokens, session cost, subscription allowance, quota utilization, remaining balance and renewal; don't combine incompatible metrics.
- No changes under `src/`, `src-tauri/`, `scripts/`, `package.json`, or permissions. No public release claim; Wayland remains untested.
- Do not replace existing ADR conclusions silently. A favorable research finding is not user approval to collect data.

## Review Focus

1. A quota API is documented but *experimental* — Task 1 records instability; Task 2 marks the stability gate `FAIL`/`UNKNOWN` rather than automatically approving it.
2. A documented method requires commercial-use-prohibited or organization-admin credentials — Task 2 records the precise prohibition/excess privilege and keeps `NO-GO`.
3. A session status-line payload includes paths or session/account metadata — Task 3 excludes all non-allowlisted fields and prevents any code or live handoff without consent.
4. Source reports run cost/token count but not subscription allowance — Task 1 records metric semantics separately; Task 4 forbids converting the former to quota.
5. Provider documents conflict, move, or become unavailable — Task 1 records URL, retrieval time, observed conflict/absence and `UNKNOWN`; Task 4 cannot promote it to `GO`.

## File map

**Read only (code and decisions):**
- `src-tauri/src/providers.rs` — placeholder snapshot, no provider IO.
- `src-tauri/src/model.rs` and `src/lib/types.ts` — existing data contract.
- `docs/decisions/ADR-0001-stack-evaluation.md`, `docs/decisions/ADR-0002-first-provider-source.md`, `docs/decisions/ADR-0003-desktop-surfaces.md` — existing accepted and rejected gates.
- `docs/qa/keyboard-and-viewports.md`, `docs/release/branding-gate.md` — unresolved platform/release limitations.

**Modify during execution:**
- `docs/research/provider-source-matrix.md` — revalidated evidence/semantics for five candidates.
- `docs/research/source-checklist.md` — permission, stability, data minimization, risks.
- `docs/decisions/ADR-0002-first-provider-source.md` — append dated reconsideration with disposition.
- `AGENTS.md`, `README.md`, `docs/superpowers/README.md`, `docs/superpowers/ROADMAP.md` — fix **status-only** inconsistencies.

**Forbidden in this plan:** `src-tauri/src/providers/<provider>.rs` (or other adapters), credential parser, CLI script, new HTTP request, new dependency, fixture containing account data.

### Task 1: Revalidar as fontes oficiais e a semântica das métricas

**Files:** Modify `docs/research/provider-source-matrix.md`; read `docs/research/source-checklist.md` and `ADR-0002`.

**Interfaces:** Produce five candidate entries with exact `provider | official URL | checked_at_utc | version | documented field | metric semantics | unit | window | reset | account/model scope | availability | evidence`. Entries may contain `unknown` and `unavailable`.

- [x] **Step 1: Estabelecer a linha de base.** Read the current matrix and ADR. Record a separate section `## Revalidation — <actual UTC date>` rather than rewriting prior evidence; note that the original research was checked on 2026-11-02.
- [x] **Step 2: Consultar apenas documentação oficial pública.** Re-check links/terms for Claude Code, Codex, Antigravity, OpenCode, Cursor. Save a canonical URL and real retrieval UTC time for each; if unavailable, record `UNKNOWN` instead of guessing or trying an endpoint.
- [x] **Step 3: Conferir campos e semântica.** For each candidate: distinguish cost, tokens, used percentage, remaining allowance and reset timestamp, naming documented field paths where known; a missing window/source means quota is `unavailable` for product display.
- [x] **Step 4: Rever casos de borda.** Explicitly record whether an experimental method is production-supported, whether any documented request needs user/session context, and how a missing/renamed schema remains `UNKNOWN` (never synthesized data).
- [x] **Step 5: Verificar o documento.** Run `rg -n 'Claude Code|Codex|Antigravity|OpenCode|Cursor' docs/research/provider-source-matrix.md` (all five found) and `git diff --check` (no errors). Manually review that each newly asserted field has an official citation and that no old rows were discarded.
- [x] **Step 6: Registrar commit pequeno.** `git add docs/research/provider-source-matrix.md && git commit -m "docs: revalidate provider quota source semantics"`.

### Task 2: Reavaliar as permissões, estabilidade e privilégio mínimo

**Files:** Modify `docs/research/source-checklist.md`; refer to the Task 1 matrix.

**Interfaces:** For each evaluated access path: `third_party_use | commercial_use | interface_stability | auth_scope | sensitive_metadata | rate_limit | local_or_network_IO`, all recorded as `PASS/FAIL/UNKNOWN` with URL and reason.

- [x] **Step 1: Comparar os termos atuais.** Verify applicability of third-party desktop/commercial access and whether any prior policy conclusion changed. If documents conflict, retain `UNKNOWN`/`FAIL` and cite both.
- [x] **Step 2: Registrar o modelo de privilégio.** Reject harvesting tokens, cookies, files, protected sessions and admin-level team credentials for a personal quota display. The absence of docs about access scope is `UNKNOWN`.
- [x] **Step 3: Verificar estabilidade e operação.** Distinguish supported APIs from experimental endpoints and session-fed output. Mark undocumented rate limits, polling cadence or response contracts as `UNKNOWN`; no calls to test real behavior.
- [x] **Step 4: Revisar cenários de falha.** Missing tool/network/auth must remain normal unavailable or not-connected states; no provider error may hide another provider. State how this would be validated by sanitized fixtures **after** approval, not by real IO now.
- [x] **Step 5: Inspecionar riscos.** Review changes for dangerous advice: instructions to read credentials, invoke `agy`, scrape UI or call unofficial endpoints must not appear as recommended implementation. Record unresolved questions explicitly.
- [x] **Step 6: Verificar e commitar.** Run `git diff --check`, inspect the full changed security table, then `git add docs/research/source-checklist.md && git commit -m "docs: recheck provider permissions and stability gates"`.

### Task 3: Avaliar um handoff opt-in de Claude Code apenas no papel

**Files:** Modify `docs/research/source-checklist.md`; optionally add a subsection to `docs/research/provider-source-matrix.md` if the schema differs.

**Interfaces:** A **document-only** field-selection proposal: input is session-provided status-line JSON, output is an allowlist of documented rate-limit fields plus explicit provenance/timestamp requirements. No parser, shell script, file destination or receiver is produced.

- [x] **Step 1: Verificar suporte oficial.** Read current Claude Code status-line docs and applicable policy. Do not presume a standalone account quota API or that a running session automatically grants permission to forward data.
- [x] **Step 2: Especificar minimização.** Name only required, documented rate-limit fields (e.g. `rate_limits.five_hour.used_percentage` and reset *if still officially documented*) and the account/plan eligibility caveat. Explicitly exclude transcript paths, conversation content, session identifiers and other metadata; no raw status-line logging.
- [x] **Step 3: Modelar consentimento e falhas.** Describe opt-in/opt-out UX, session-absent state, missing fields, bad reset/timezone and how to avoid implying an official quota where unsupported. Mark policy permission still `UNKNOWN` unless proven otherwise.
- [x] **Step 4: Testar a documentação por revisão adversarial.** Answer: Could this instruction be interpreted as permission to execute Claude Code or read its config? Could non-allowlisted fields leak? Can a missing session be mistaken for a zero quota? If yes, revise the doc.
- [x] **Step 5: Verificar e commitar.** Run `git diff --check`; commit only the changed research files with `git commit -m "docs: scope optional Claude status-line handoff review"`.

### Task 4: Reabrir ou manter o ADR com decisão explícita

**Files:** Modify `docs/decisions/ADR-0002-first-provider-source.md`; read both updated research files.

**Interfaces:** Date-stamped block with `Source | Metrics | Policy | Stability | Least privilege | Open questions | Disposition | Recheck triggers`, and exactly one top-level decision: `NO-GO` or `GO for user review (not implementation authorization)`.

- [x] **Step 1: Pontuar os gates obrigatórios.** One `FAIL`/`UNKNOWN` in source stability, permission, semantics or privilege means **NO-GO for that access path**. Do not rank a provider by popularity or technical reachability alone.
- [x] **Step 2: Registrar a decisão.** Append a dated section to `ADR-0002`, keeping the original NO-GO entry visible. Describe all rejected/unknown alternatives and name **at most one** conditional candidate.
- [x] **Step 3: Se houver candidato, preparar a aprovação.** Present exact source URL, fields, permission boundary, retention, allowed IO, privacy risks and tests for user review; **stop here**. Do not create an implementation plan, change code or collect anything before explicit source-specific user approval.
- [x] **Step 4: Se todos bloqueados, registrar NO-GO.** State precise evidence needed for reconsideration, preserve `not_connected` and `usage: None`, and do not try workaround via scraping or tokens.
- [x] **Step 5: Verificação e commit.** Run `rg -n 'NO-GO|GO for user review|Source|Metrics|Permission' docs/decisions/ADR-0002-first-provider-source.md`, review citations and `git diff --check`; `git add docs/decisions/ADR-0002-first-provider-source.md && git commit -m "docs: record provider source reconsideration decision"`.

### Task 5: Sincronizar status do projeto e validar o escopo do diff

**Files:** Modify `AGENTS.md`, `README.md`, `docs/superpowers/README.md`, `docs/superpowers/ROADMAP.md` only where their historical status or next action is inconsistent.

**Interfaces:** Root documentation distinguishes `01–06 complete within gates`, `04 collector NO-GO`, `07 proposed/research status`, `Mint Cinnamon/X11 accepted`, `Wayland untested`, `DEB internal-only`, `public branding blocked`.

- [x] **Step 1: Comparar documentos.** In particular, root README currently says plans are unchecked and AGENTS.md still directs the agent to start at Plan 01; correct status text without changing actual historical evidence.
- [x] **Step 2: Atualizar índice de planos.** Add Plan 07 with links to its spec and plan; mark the research completed while preserving the distinction between completing research and approving a collector.
- [x] **Step 3: Verificar os limites.** Confirm no new permission/telemetry/native surface/public-release claim was added. Keep prior QA gaps and trademark gate visible.
- [x] **Step 4: Revisar o diff de ponta a ponta.** Run `git diff --check`, `git diff --name-only` and `git status --short`; expected changed paths **only** under `docs/` and the two root Markdown documents. Inspect for accidental secrets and incorrect provider claims. `npm test` is optional for a docs-only change and **must not be reported as passed unless actually run**.
- [x] **Step 5: Commit e revisão.** `git add AGENTS.md README.md docs/superpowers/README.md docs/superpowers/ROADMAP.md && git commit -m "docs: align Phase 2 research plan and status"`; request review. Do **not** merge automatically or implement provider access.

## Exit criteria

- [x] Five candidate evaluations reference current official public sources with UTC dates.
- [x] Policy, commercial-use permission, authentication scope and stability statuses are explicit, including unknowns.
- [x] Claude Code handoff is **document-only** with strict field minimization and no executed script.
- [x] `ADR-0002` contains a dated GO-for-user-review or NO-GO reconsideration, without erasing past evidence.
- [x] Documentation reflects the true 01–06 gates and Plan 07 status.
- [x] No code or dependency changes, no provider calls, no credentials accessed, and no unapproved collector plan created.

**Stop rule:** If no path passes every mandatory gate, maintain **NO-GO**. A research GO is *not* permission to implement: present exact source, metrics and consent boundary to the user and wait for approval before creating a provider-specific implementation plan.


## Execution result

Completed 2026-11-02 in an isolated branch. Official-source revalidation found mandatory permission, stability, or least-privilege gates that remain FAIL/UNKNOWN for all candidates. No provider CLI, account, endpoint, credential, local usage/session data, collector code, or dependency was used. ADR-0002 remains NO-GO; providers remain `not_connected` with `usage: None`.
