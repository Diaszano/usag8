# Linux stack validation — design specification

**Status:** Proposed; requires execution on the user's Linux Mint Cinnamon machine.
**Intent:** Decide whether the existing candidate Tauri 2 + Rust + Svelte 5 is acceptable *before* real provider integrations. No feature work or external credentials in this phase.

## Ground truth
- Existing backend: `src-tauri/src/lib.rs` invokes `providers::unavailable_snapshot()` via `get_dashboard_snapshot`.
- Existing frontend: `src/App.svelte` and `src/lib/dashboard.ts` render three unconnected providers, including **Antigravity** (not Gemini CLI/AGY CLI).
- Existing commands: `npm run check`, `npm test`, `npm run build`, `cargo test --manifest-path src-tauri/Cargo.toml` and `bash scripts/doctor.sh`.

## Required behavior
1. Capture `XDG_CURRENT_DESKTOP`, `XDG_SESSION_TYPE`, distro release, architecture and required binary/library versions without reading any assistant data.
2. Run frontend and Rust checks, launch actual Tauri native window, inspect no-data state, dark/light/system themes, and 1280×720 minimum practical viewport; note 1024×768 and 360×600 as *design studies*, not guaranteed native windows.
3. Log factual startup, idle CPU/RSS (with collection commands and repeat count), WebKitGTK rendering, focus, window resizing, Cinnamon notifications and X11/Wayland differences. Mark untested matrices explicitly.
4. Compare GTK4/libadwaita *only if* a concrete Tauri blocker is found. DEB is a separate release gate.
5. No telemetry, privileged scan, credentials, remote provider access, tray, overlay, SQLite or speculative usage data.

## Acceptance and gate
- Deliver redacted environment report and commands/results, plus ADR status: **Accepted**, **Rejected** or **Deferred** with recorded evidence.
- On untested runtime/unsupported dependencies, stop; do not call Tauri validated.

**Source:** https://v2.tauri.app/start/prerequisites/ and https://v2.tauri.app/reference/config/ (confirm on implementation date).
