# MVP spike plan — subject to design approval

**Goal:** validate the Tauri 2 / Svelte / Rust candidate on the actual Linux Mint Cinnamon environment, using a no-data Usag8 screen. Do not add provider integrations or SQLite in this stage.

## Task 1 — Environment baseline
- Run `bash scripts/doctor.sh` on the target Mint machine.
- Record distro, Cinnamon/GNOME session, X11/Wayland, Node, Rust and WebKitGTK availability.
- If prerequisites are missing, install only reviewed packages from the Tauri official docs.
- Acceptance: environment report attached to task; no blanket statement of support.

## Task 2 — Frontend baseline
- `npm install`, `npm run check`, `npm test`, `npm run build`.
- Acceptance: all commands pass; lockfile committed to future repo; no fabricated metrics.
- Review interface at 1280x720 and with light/dark, system theme and reduced motion.

## Task 3 — Rust/Tauri baseline
- `cargo test --manifest-path src-tauri/Cargo.toml` and `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings`.
- `npm run tauri dev`; verify window starts and `get_dashboard_snapshot` produces only unconnected states.
- Acceptance: no credentials touched; record startup and memory observations (do not invent measurements).

## Task 4 — First release decision
- Inspect WebKitGTK rendering and Linux integration; decide whether to retain Tauri or prototype GTK4.
- Record an ADR for accepted stack, list remaining blockers.
- Only then plan an approved provider source.

**Deferred:** SQLite, remote quotas, history, system tray, global floating sidebar, text indicators in panel, auto-updaters.
