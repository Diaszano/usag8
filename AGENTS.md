# Usag8 — coding-agent project instructions

Use these project instructions **together with the installed obra/superpowers skills**, not as a replacement for them.

## Project facts
- Linux-first, Linux Mint Cinnamon reference. Cinnamon is not GNOME Shell.
- Name `usag8` is provisional for commercial use. Brand, identifier and domain checks pending.
- Penpot contains design exploration; do not copy Metria branding.
- Stack under validation: Tauri 2 + Rust + Svelte 5 + TypeScript + Vite. SQLite is **not** included in this first spike.
- No network-backed provider integration or actual quota data is implemented.
- Antigravity is the product label; `agy` is a CLI command, not the user-facing name.

## Mandatory workflow
1. Inspect real repository state and current task before proposing changes.
2. Use relevant Superpowers skills. For substantial work: brainstorming -> design approval -> writing-plans -> TDD -> code review -> verification.
3. Keep changes small. Record architecture decisions in docs/decisions. Work in a dedicated Git branch or worktree when appropriate.
4. Preserve strict source classification: confirmed, estimated, unavailable. Never imply an official quota from local token logs.
5. Read local data only when a connector is approved, with explicit reason and minimum privileges. Never log secrets or credentials.
6. Tests must run before claiming success. If tools are unavailable, record exactly what was not tested.
7. Use English file/function/variable names, Portuguese (Brazil) user-facing explanations.
8. UI should work without system tray, floating global overlay, or global hotkey; do not promise cross-desktop support without testing.

## Definition of done (per task)
- Clear acceptance criteria and minimal design change.
- Frontend check/tests; Rust tests/Clippy for backend changes; no test fabrication.
- Dark/Light and keyboard/reduced motion considered when UI is changed.
- Credential safety, tool availability and error/empty states considered.
- No mixed incompatible metrics; no invented times/limits.

## Scope now
Implement a real Tauri window and a reliable 'not connected' state. Next evaluate one provider with a legal, stable, authorized source. Defer SQLite, history, alerts, panel text and floating global sidebar.

## Plan queue (2026-11-02)
- Read `docs/superpowers/README.md` and relevant `docs/superpowers/specs/*.md` before implementing a `docs/superpowers/plans/*.md` plan.
- **Plan 01 is first.** Plans 02–06 are proposals; adhere to their explicit acceptance gates.
- Plan 04 is research-only: do not implement a collector before approved source-specific documentation/ADR and follow-up plan.
- The historical `docs/plans/2026-11-01-mvp-validation.md` must not override the new spec-backed plans.
