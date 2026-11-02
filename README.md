# Usag8 — Superpowers Starter Kit

**Status: candidate development stack, not a shipped application.**

A minimal Linux-first Tauri 2 + Rust + Svelte 5 + TypeScript prototype, accompanied by Superpowers-oriented agent instructions. All provider snapshots are deliberately **not connected**; there are no quota guesses, credentials, analytics or network calls.

## Included
- Tauri desktop shell and a Rust `get_dashboard_snapshot` command (stub with no provider access)
- Svelte Dark / Light / System preview, Dashboard / Details / Settings and browser-only preview fallback
- Pure formatting functions, frontend unit tests and a Rust test
- `AGENTS.md`, proposed ADR, six scoped Superpowers implementation plans and specs, workflow guidance
- Linux Mint environment diagnostic and placeholder app icons

## Getting started on Linux Mint Cinnamon
Install Node.js (modern LTS) and Rust via official channels. Confirm actual session using `bash scripts/doctor.sh`.

Official Tauri 2 Debian/Ubuntu prerequisites:

```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

These packages are for the Tauri build only; AppIndicator is **not** enabled in the prototype.

Then, inside this extracted directory:

```bash
npm install
npm run check
npm test
npm run build
cargo test --manifest-path src-tauri/Cargo.toml
npm run tauri dev
```

To create a test DEB **only after** the prototype runs and the placeholder identity/icon have been reviewed:

```bash
npm run tauri build
```

The first `npm install` generates `package-lock.json`. Commit it to your own repository after checking package versions. This starter intentionally contains no credentials or user data.

### Browser-only preview

```bash
npm run dev
```

Open `http://127.0.0.1:5173`; browser preview displays unavailable providers only. Running in a browser does **not** validate native Tauri, WebKitGTK, Cinnamon or Wayland.

### Superpowers
Start with [docs/superpowers/README.md](docs/superpowers/README.md) and the [plan roadmap](docs/superpowers/ROADMAP.md); installation steps remain in [docs/superpowers.md](docs/superpowers.md). Install the upstream plugin separately in your chosen agent. The project contains only context and plans; it does not bundle or install Superpowers automatically.

### Project structure

```text
AGENTS.md                        Coding agent project instructions
src/                            Svelte UI and typed contract
src-tauri/                      Rust command and Tauri config
scripts/doctor.sh               Local Mint environment diagnostic
docs/stack.md                   Candidate stack, boundaries and risks
docs/superpowers.md             Setup and agent workflow
docs/plans/                     Historical initial MVP plan
docs/superpowers/specs/         Six focused feature specifications
docs/superpowers/plans/         Six executable plans (unchecked tasks)
docs/decisions/                 Architecture decision records
```

### Boundaries
- No SQLite yet: the first spike does not require persistence.
- No real data or metrics: percentages from Penpot are illustrative, so none is present in the code.
- System tray / global floating sidebar / global shortcuts and text in the panel are deferred and need desktop-specific verification.
- The `usag8` product name and package identifier are provisional.
- This kit is new source; it does **not** modify existing files or designs in Penpot.

### Source references
- https://github.com/obra/superpowers
- https://v2.tauri.app/start/create-project/
- https://v2.tauri.app/start/prerequisites/
- https://v2.tauri.app/reference/config/
