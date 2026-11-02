# Internal DEB QA record

## Preflight

| Gate | Result | Evidence |
| --- | --- | --- |
| Tauri stack accepted for target | PASS | ADR-0001 accepted for Linux Mint Cinnamon/X11; Wayland is untested. |
| Identity/public release clearance | INTERNAL-ONLY | `usag8`, `dev.usag8.desktop`, and placeholder icons are provisional. See `branding-gate.md`. |
| Build environment | PASS | Linux Mint 22.3 Zena, Cinnamon 6.6.9, X11, x86_64. |
| Tauri capabilities | PASS | `src-tauri/capabilities/default.json` grants only `core:default` to window `main`; no shell or broad filesystem permission. |
| Frontend / Rust quality gates | PASS | In ext4 copy: `npm ci --offline` (72 packages, audit reported 0 vulnerabilities); `npm run check` (0 errors, 0 warnings); `npm test` (44 passed); `npm run build` passed; `cargo test --manifest-path src-tauri/Cargo.toml` (1 passed); `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings` passed. |
| DEB artifact contents / dependencies | PENDING | Inspect actual build output in Task 2. |
| Install/remove smoke | PENDING | No installation on the personal host without explicit approval. |

The app reads no provider credentials, performs no provider network request, and has no telemetry or updater. This report tracks an internal test package only.
