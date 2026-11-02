# Usag8 Linux Stack Spike Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Verify the existing Tauri 2/Svelte/Rust candidate on Linux Mint Cinnamon without collecting real AI usage data.

> Execution tracking: checked boxes mean the action or gate disposition was recorded; they do not imply that a blocked check passed. See the evidence report and SDD ledger.

**Architecture:** Keep `get_dashboard_snapshot` read-only and stubbed. Gather measured runtime evidence on the user's machine before accepting the stack; no feature architecture changes in this spike.

**Tech Stack:** Tauri 2, Rust, Svelte 5, TypeScript, Vite, WebKitGTK 4.1, Linux shell.

**Spec:** `docs/superpowers/specs/2026-11-02-linux-spike-design.md`

## Global Constraints
- Linux Mint Cinnamon is the first real target; X11 and Wayland are distinct test configurations, not assumptions.
- Do not access assistant files, tokens, network APIs or introduce telemetry.
- No SQLite, tray, overlay, global hotkey or true quota values yet.
- Existing `AGENTS.md`, `src-tauri/src/lib.rs`, `src-tauri/src/providers.rs` and `src/App.svelte` are the baseline.
- Stop and record a blocker rather than falsely claiming an unperformed GUI run.

## Review Focus
1. Missing `webkit2gtk-4.1`: diagnostic must report it and stop before claiming a valid native build — Task 1.
2. Running in an unsupported session: record exact desktop/session and mark untested cases — Task 1.
3. Browser preview passes but native Tauri fails: distinguish the outcomes — Task 2.
4. `get_dashboard_snapshot` unexpectedly carries usage: native command must return null for every provider — Task 3.
5. High idle consumption or broken WebKit rendering: ADR remains Deferred/Rejected pending comparison — Task 4.

## File map
- Existing: `scripts/doctor.sh`, `src-tauri/src/providers.rs`, `docs/decisions/ADR-0001-stack-evaluation.md`.
- Create: `docs/research/linux-mint-baseline.md` (machine evidence, not credentials).
- Create: `docs/research/tauri-performance.md` (repeatable observations).

### Task 1: Environment evidence and missing dependency gate

**Files:** Read `scripts/doctor.sh`; Create `docs/research/linux-mint-baseline.md`.

**Interfaces:** Consumes system command outputs; produces a redacted matrix: distro, desktop, session, architecture, `node/npm/rustc/cargo`, `webkit2gtk-4.1`, `openssl` and missing prerequisites.

- [x] **Step 1: Run the existing read-only diagnostic.** Run `bash scripts/doctor.sh` and `uname -m`. Expected: actual values or `MISSING` (not invented defaults).
- [x] **Step 2: Verify Tauri prerequisites from the current upstream guide.** Compare against <https://v2.tauri.app/start/prerequisites/>; do not install automatically.
- [x] **Step 3: Record output and failures.** Write `docs/research/linux-mint-baseline.md` with commands, dates, versions, session, and `PASS/FAIL/UNTESTED` for each prerequisite. Redact user directory paths.
- [x] **Step 4: Review and commit.** Run `git diff --check`; expected exit 0. Commit: `git add docs/research/linux-mint-baseline.md && git commit -m "docs: capture Linux Mint baseline"`.

### Task 2: Frontend baseline without real provider data

**Files:** Read `package.json`, `src/App.svelte`, `src/lib/dashboard.ts`, `src/lib/format.test.ts`; Modify only if a reproduced failure has a narrowly scoped fix.

**Interfaces:** Existing `readDashboard(): Promise<DashboardSnapshot>`; no new interface.

- [x] **Step 1: Lock dependencies.** Run `npm install` and review the generated `package-lock.json` for unexpected packages; note any unsupported Node version.
- [x] **Step 2: Test exact baseline.** Run `npm run check && npm test && npm run build`. Expected: commands exit 0; on failure, record output and fix only the identified issue with a regression test.
- [x] **Step 3: Verify the prototype invariant.** Inspect `src/lib/dashboard.ts` and existing tests: three IDs (`claude-code`, `codex`, `antigravity`), each `usage:null`, `state:'not_connected'`. Run `npm test -- src/lib/format.test.ts`; expected PASS.
- [x] **Step 4: Browser smoke.** Run `npm run dev`; verify UI says no provider connected, not 62%/27%. Mark this `BROWSER ONLY`.
- [x] **Step 5: Commit reproducibility artifacts.** `git add package-lock.json` (if generated and reviewed), plus any actual fix/test, then `git commit -m "chore: lock validated frontend baseline"` (skip commit when no diff).

### Task 3: Rust and actual desktop window

**Files:** Read `src-tauri/src/providers.rs`, `src-tauri/src/lib.rs`, `src-tauri/tauri.conf.json`; update `docs/research/linux-mint-baseline.md` with GUI evidence.

**Interfaces:** Existing `get_dashboard_snapshot() -> model::DashboardSnapshot`; no new API.

- [x] **Step 1: Verify backend tests.** `cargo test --manifest-path src-tauri/Cargo.toml` and `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings`; expected PASS.
- [x] **Step 2: Verify a native window.** `npm run tauri dev` on the Mint desktop (not just a browser). Record whether it starts, missing libs and the actual desktop session.
- [ ] **Step 3: Exercise empty state.** Check that `get_dashboard_snapshot` yields three unconnected providers with null usage and collectedAt; no credentials requested. If incorrect, write a failing Rust test in `src-tauri/src/providers.rs`, run targeted `cargo test`, make minimal fix, rerun.
- [ ] **Step 4: Record GUI checks.** Test Dark/Light/System, resizing near 1280×720, keyboard navigation, window close/reopen and disconnected network. Mark each `PASS/FAIL/UNTESTED` in baseline report.
- [x] **Step 5: Commit verified improvements only.** `git diff --check`; commit actual code/tests/reports as `test: verify native Tauri baseline`.

### Task 4: Performance gate and ADR

**Files:** Create `docs/research/tauri-performance.md`; Modify `docs/decisions/ADR-0001-stack-evaluation.md`.

**Interfaces:** Produces `Accepted/Rejected/Deferred` decision with evidence; downstream plans must read it.

- [x] **Step 1: Define repeatable observations.** Record how to capture startup, idle RSS, CPU and loading failures using actual tools (`/usr/bin/time`, `ps`, system monitor), and measured runs (at least three when feasible). Do not invent numerical thresholds.
- [ ] **Step 2: Measure actual Tauri run.** Execute the chosen method; log commands, versions, and measured values. Record WebKitGTK rendering and UI behavior.
- [ ] **Step 3: Compare GTK4/libadwaita only on evidenced blocker.** Write specific alternative experiment requirements, not a speculative rewrite.
- [x] **Step 4: Update ADR.** Record `Accepted`, `Rejected` or `Deferred`, test matrix, risks, and why; when unable to run on Mint choose **Deferred**.
- [x] **Step 5: Validate and commit.** `git diff --check`; `git add docs/research/tauri-performance.md docs/decisions/ADR-0001-stack-evaluation.md && git commit -m "docs: decide Linux desktop stack from evidence"`.

**Exit gate:** Only proceed to native UI implementation after an **Accepted** stack decision (or explicitly authorized limited frontend-only work).
