# Penpot UI, Responsive Layout and Navigation Implementation Plan

**Execution status:** Complete. Runtime system-preference switching, forced reduced-motion, and some scaled/no-hover cases remain explicitly `UNTESTED` in `docs/qa/keyboard-and-viewports.md`.


> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Implement the agreed visual hierarchy for Dashboard, Provider Details, Settings and internal Quick View with keyboard access and responsive layout.

**Architecture:** Keep the existing `src/App.svelte` shell and `src/app.css`; extract only small, reused components after seeing duplication. Navigation is local UI state, not a new router dependency. No global overlay or live usage data.

**Tech Stack:** Svelte 5, TypeScript, CSS, Vitest; optional dev-only `@testing-library/svelte` + `jsdom` after explicit review.

**Spec:** `docs/superpowers/specs/2026-11-02-penpot-ui-design.md`

## Global Constraints
- Existing Svelte 5 runes (`$state`, `$derived`, `$effect`) are accepted patterns; do not add a state manager by default.
- Preserve not-connected display and safe `null` metrics. Penpot percentages are **fictional**; do not insert them into the app.
- Responsive references: 1280×720 Dashboard/Details/Settings; 1024×768 compact sidebar; 360×600 *in-app* Quick View.
- Accessible name for icon-only elements; focus visible; reduced-motion; no hover-only action.
- Provider logos must have verified permission and source metadata; fallback initials until approval.

## Review Focus
1. At 1024×768 navigation labels hidden => icons still have accessible names and focus — Task 2.
2. At 360×600 provider metrics never cause horizontal scrolling — Task 3.
3. `prefers-color-scheme` changes at runtime => System follows it — Task 1.
4. Keyboard-only users can access preview, click details, close with Esc and recover focus — Task 4.
5. Error, loading and unavailable states remain readable in both themes — Task 3.

## File map
- Modify: `src/App.svelte`, `src/app.css`, `src/lib/dashboard.ts` only if necessary.
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`, `src/lib/navigation.ts`, `src/lib/navigation.test.ts`, `src/lib/provider-icons.ts`, `docs/assets/provider-logos.md`.
- Optional after review: `src/lib/QuickView.svelte` (only if compact UI is reused in two places).

### Task 1: Theme state without persistence

**Files:** Create `src/lib/theme.ts`, `src/lib/theme.test.ts`; Modify `src/App.svelte`.

**Interfaces:** `export type ThemePreference = 'system' | 'dark' | 'light'`; `export function resolveTheme(preference: ThemePreference, systemDark: boolean): 'dark' | 'light'`.

- [x] **Step 1: Write RED tests.** `resolveTheme('system',true) === 'dark'`, system false => light, explicit light/dark override system.
- [x] **Step 2: Run RED.** `npm test -- src/lib/theme.test.ts`; expected FAIL missing export.
- [x] **Step 3: Implement.** Keep pure resolver, reuse App's `matchMedia('(prefers-color-scheme: dark)')` listener; avoid localStorage/persistence.
- [x] **Step 4: Run GREEN.** `npm test && npm run check`; manually switch system appearance while app runs and observe correct theme.
- [x] **Step 5: Commit.** `git add src/lib/theme.ts src/lib/theme.test.ts src/App.svelte && git commit -m "feat: resolve adaptive appearance"`.

### Task 2: Desktop navigation and responsive sidebar

**Files:** Create `src/lib/navigation.ts`, `src/lib/navigation.test.ts`; Modify `src/App.svelte`, `src/app.css`.

**Interfaces:** `type View = 'dashboard' | 'details' | 'settings'`; `type NavigationAction = {type:'dashboard'} | {type:'settings'} | {type:'provider'; id:string}`; `navigate(current: {view:View;selectedId:string}, action:NavigationAction): {view:View;selectedId:string}`.

- [x] **Step 1: Write RED tests.** Provider selection preserves chosen id; settings switches view without losing selection; dashboard returns view and retains id.
- [x] **Step 2: Run RED.** `npm test -- src/lib/navigation.test.ts`; expected FAIL.
- [x] **Step 3: Implement minimal navigation.** Use pure switch in `navigation.ts`, call from App buttons; CSS compact sidebar below 1100px. Label each icon-only button via `aria-label` and `title` (tooltip); ensure `aria-current` matches selected page.
- [x] **Step 4: Verify GREEN and visual.** `npm test && npm run check`; manually inspect at 1280×720 and 1024×768 without horizontal scrolling, Tab reaches all controls.
- [x] **Step 5: Commit.** `git add src/lib/navigation.ts src/lib/navigation.test.ts src/App.svelte src/app.css && git commit -m "feat: add accessible desktop navigation"`.

### Task 3: In-app Quick View at 360×600

**Files:** Modify `src/App.svelte`, `src/app.css`; optionally Create `src/lib/QuickView.svelte` *only* if extraction eliminates actual duplication.

**Interfaces:** Local App view extension `type View = 'dashboard' | 'details' | 'settings' | 'quick-view'` (update Task 2 union if needed); consumes `DashboardSnapshot`, `formatUsage`, `providerStateLabel` and `qualityLabel`.

- [x] **Step 1: Write RED behavior test.** Add pure assertion to `src/lib/navigation.test.ts`: Quick View can open a selected provider and return to Dashboard; no unseen provider id accepted. Update `navigate` union/signature to handle `{type:'quick-view'}` without introducing a router.
- [x] **Step 2: Run RED.** `npm test -- src/lib/navigation.test.ts`; expected FAIL on unsupported action.
- [x] **Step 3: Implement compact view.** Show provider name/state, quality and null as `—`, with click-to-details, without global overlay. CSS at 360×600 uses stack layout, 44px target where feasible; no imported Penpot demo percentages.
- [x] **Step 4: Run GREEN and viewport check.** `npm test && npm run check && npm run build`; manually verify 360×600, overflow, large text, empty/error states, reduced motion.
- [x] **Step 5: Commit.** `git add src/lib/navigation.ts src/lib/navigation.test.ts src/App.svelte src/app.css && git commit -m "feat: build internal quick view"`.

### Task 4: Focus/hover parity and visual QA

**Files:** Modify `src/App.svelte`, `src/app.css`; Create `docs/qa/keyboard-and-viewports.md`; Create `docs/assets/provider-logos.md`.

**Interfaces:** UI preview behavior: focus/hover reveals same content; Esc dismisses transient view; activation opens details; focus returns to original trigger after dismissal. No need for native global hotkeys.

- [x] **Step 1: Write test scenarios in `docs/qa/keyboard-and-viewports.md`.** Include Tab order, keyboard-only provider selection, Enter/Space, Esc, forced reduced motion and a no-hover pointer path; record expected behavior per case.
- [x] **Step 2: Implement minimal DOM events and focus restoration.** Use local state and element refs; don't attach global listeners beyond needed scope. Add clear focus outline in CSS.
- [x] **Step 3: QA with evidence.** Run `npm run check && npm test && npm run build`. In actual app, check 1280×720, 1024×768 and 360×600, Dark/Light/System and 125–200% scaling; mark `UNTESTED` when not run.
- [x] **Step 4: Record asset provenance.** In `docs/assets/provider-logos.md`, document actual asset URL/license/permission and fallback; never hotlink remote provider icons.
- [x] **Step 5: Commit.** `git add src/App.svelte src/app.css docs/qa/keyboard-and-viewports.md docs/assets/provider-logos.md && git commit -m "test: verify focus, themes and responsive UX"`.

**Exit gate:** In-app flows function without tray/overlay. Desktop visual matching is a reviewed product direction, not a claim of pixel-perfect parity.
