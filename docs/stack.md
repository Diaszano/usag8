# Stack candidate v0.1 — Usag8

| Layer | Candidate | Validation |
|---|---|---|
| Linux desktop | Tauri 2 + Rust | Build & run on Mint Cinnamon X11/Wayland; compare GTK4 if WebKitGTK fails |
| Frontend | Svelte 5 + TypeScript + Vite | Responsive 1280x720 and Quick View 360x600 |
| Design | Penpot + CSS tokens | Dark / Light / System, no copied Metria interface |
| Storage | SQLite **later** | Add only for approved histories/settings, follow XDG |
| Monitoring | Isolated provider modules **later** | First confirm source, terms and permissions |
| Tests | Vitest, cargo test, Clippy | Red-green-refactor under Superpowers |
| Packaging | DEB **later** | Test Debian dependencies and install/uninstall |
| Desktop extras | Notifications / AppIndicator / floating sidebar **later** | Cinnamon and GNOME, X11/Wayland verification |

### Data contract
Every real metric requires source, unit, time window, quality and updatedAt. Missing data is represented as `null`, not a guessed 0%.
A provider failure must not affect any other provider. This spike reports all providers as **not connected**.

### Security
No credentials, no privileged filesystem scans, no network requests, no telemetry, no shell execution from the UI. Tauri capabilities allow only core permissions.

### Evidence still missing
- Local Rust/Tauri build on the user's Mint installation.
- WebKitGTK memory, startup and desktop behavior measurements.
- Source viability and licensing for any provider.
- Choice of permanent package identifier and branding clearance.
