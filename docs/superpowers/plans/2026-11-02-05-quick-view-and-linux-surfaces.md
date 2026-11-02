# In-App Quick View and Linux Surfaces Evaluation Implementation Plan

**Execution status:** Complete within the in-app MVP scope. Native panel/AppIndicator experiments are `UNTESTED` and deferred pending separate approval; see ADR-0003 and the capability matrix.


> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Build an accessible in-app quick view and determine whether Cinnamon/GNOME can reliably host provider indicators without making them mandatory.

**Architecture:** The same `DashboardSnapshot` powers the main UI, Quick View and optional future desktop surface. Implement core compact UI first; experiment separately with Linux panel/tray support and record fallback.

**Tech Stack:** Svelte 5, CSS, Tauri 2, Rust, native Linux desktop experimentation (no new dependency by default).

**Spec:** `docs/superpowers/specs/2026-11-02-linux-surfaces-design.md`

## Global Constraints
- No desktop global overlay, text-in-panel, privileged hotkey or tray dependency in the MVP.
- Cinnamon ≠ GNOME; Wayland ≠ X11. No cross-desktop claim without local verification.
- All metrics share only a normalized data contract, **not** a combined quota.
- No fake refresh timestamp; `—` until validated source.

## Review Focus
1. Tray absent => Quick View remains reachable inside app — Task 1.
2. No hover/pointer => preview works on click/focus — Task 2.
3. Click outside/Esc => preview closes and focus returns — Task 2.
4. Indicador accepted on Cinnamon but absent on GNOME => describe as optional, not universally supported — Task 3.
5. Text-in-panel not possible => graceful icon-only/fallback to in-app labels — Task 3.

## File map
- Reuse `src/App.svelte`, `src/app.css`, `src/lib/types.ts`, `src/lib/dashboard.ts`.
- Create `src/lib/quick-view.ts`, `src/lib/quick-view.test.ts` only if a pure mapping is needed after Plan 03; do not create another data source.
- Create `docs/research/linux-surface-matrix.md`, `docs/decisions/ADR-0003-desktop-surfaces.md`.

### Task 1: Compact labels as pure presentation

**Files:** Create `src/lib/quick-view.ts`, `src/lib/quick-view.test.ts`; Modify `src/App.svelte` only if Plan 03's Quick View does not already provide the behavior.

**Interfaces:** `type CompactProviderLabel = { id: string; name: string; usageLabel: string; qualityLabel: string; stateLabel: string }`; `toCompactProviderLabel(provider: ProviderSnapshot): CompactProviderLabel` consumes existing formatters.

- [x] **Step 1: Write RED tests.** Null metric => `usageLabel:'—'`, quality unavailable; provider name `Antigravity`, error state remains visible; estimated metric always marked `Estimado`.
- [x] **Step 2: Run RED.** `npm test -- src/lib/quick-view.test.ts`; expected FAIL missing mapper.
- [x] **Step 3: Implement smallest mapper.** Reuse `formatUsage`, `qualityLabel`, `providerStateLabel`. Do not add polling or IPC.
- [x] **Step 4: Run GREEN.** `npm test && npm run check`; inspect existing compact UI with no tray configured.
- [x] **Step 5: Commit.** `git add src/lib/quick-view.ts src/lib/quick-view.test.ts src/App.svelte && git commit -m "feat: share compact provider labels"` (omit unchanged files).

### Task 2: Preview keyboard and fallback

**Files:** Modify `src/App.svelte`, `src/app.css`; Modify `docs/qa/keyboard-and-viewports.md` from Plan 03.

**Interfaces:** Keep local preview open/selected provider state in Svelte; events: pointerenter, focusin and click; Escape closes and returns focus to trigger. No global overlay.

- [x] **Step 1: Describe failing behavior.** Record keyboard-only path that cannot reach preview, unavailable/error state preview, and focus lost after Esc. Add checks to QA file.
- [x] **Step 2: Implement preview controls.** Use a single conditional popup anchored within app and suitable ARIA semantics; avoid hover-only access. Tooltips must not obscure content when scaled.
- [x] **Step 3: Verify focused operation.** Run `npm run check && npm test && npm run build`, manually test Tab, Enter, Escape, 360×600 view and reduced motion. Record PASS/FAIL/UNTESTED; do not treat Penpot interaction as proof.
- [x] **Step 4: Commit.** `git add src/App.svelte src/app.css docs/qa/keyboard-and-viewports.md && git commit -m "feat: accessible in-app provider preview"`.

### Task 3: Desktop indicator feasibility only

**Files:** Create `docs/research/linux-surface-matrix.md`; Create `docs/decisions/ADR-0003-desktop-surfaces.md`.

**Interfaces:** Matrix dimensions: `{desktop: Cinnamon | GNOME | KDE, session:X11 | Wayland, indicator: supported | unsupported | untested, dynamic_text, focus, scaling, fallback}`.

- [x] **Step 1: Record real session and support status.** Run `echo "$XDG_CURRENT_DESKTOP" "$XDG_SESSION_TYPE"` and record distro; do not presume GNOME Shell on Mint.
- [x] **Step 2: Run isolated AppIndicator experiments only after approval.** If no permitted test or relevant installed desktop, mark `UNTESTED` rather than inventing compatibility. No production code yet.
- [x] **Step 3: Evaluate reliability.** Check app start without tray, text label support, activation, keyboard accessibility, close/reopen and multiple displays. Record concrete observations with source/version.
- [x] **Step 4: Write ADR.** State `In-app only`, `Optional AppIndicator` or `Deferred` for each feature. **Global floating sidebar remains deferred** until compositor constraints are independently validated.
- [x] **Step 5: Commit.** `git add docs/research/linux-surface-matrix.md docs/decisions/ADR-0003-desktop-surfaces.md && git commit -m "docs: evaluate optional Linux desktop surfaces"`.

**Exit gate:** The app works without status area or panel integration. Any new native plugin is a separately approved plan.
