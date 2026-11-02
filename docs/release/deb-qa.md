# Internal DEB QA record

## Preflight

| Gate | Result | Evidence |
| --- | --- | --- |
| Tauri stack accepted for target | PASS | ADR-0001 accepted for Linux Mint Cinnamon/X11; Wayland is untested. |
| Identity/public release clearance | INTERNAL-ONLY | `usag8`, `dev.usag8.desktop`, and placeholder icons are provisional. See `branding-gate.md`. |
| Build environment | PASS | Linux Mint 22.3 Zena, Cinnamon 6.6.9, X11, x86_64. |
| Tauri capabilities | PASS | `src-tauri/capabilities/default.json` grants only `core:default` to window `main`; no shell or broad filesystem permission. |
| Frontend / Rust quality gates | PASS | In ext4 copy: `npm ci --offline` (72 packages, audit reported 0 vulnerabilities); `npm run check` (0 errors, 0 warnings); `npm test` (44 passed); `npm run build` passed; `cargo test --manifest-path src-tauri/Cargo.toml` (1 passed); `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings` passed. |
| DEB artifact contents / dependencies | PASS | `usag8_0.1.0_amd64.deb`, package `usag8`, version `0.1.0`, amd64, 2,932,816 bytes; Depends: `libwebkit2gtk-4.1-0`, `libgtk-3-0`; contains `/usr/bin/usag8`, desktop entry and 32/128/256px app icons. No maintainer scripts. |
| Install/remove smoke | PENDING | No installation on the personal host without explicit approval. |

The app reads no provider credentials, performs no provider network request, and has no telemetry or updater. This report tracks an internal test package only.

## Package build and inspection

- Built with `npm run tauri build` from the ext4 source copy. The VFAT checkout's npm executable links are unusable, so task builds run in `/tmp/usag8-plan01` with only current source files mirrored.
- Initial package inspection found Cargo registry paths under `/home/diaszano/.cargo` embedded in the executable. Rebuilt with Rust `--remap-path-prefix` for the temporary workspace and Cargo cache, then inspected the new artifact.
- Final executable string checks found none of `/tmp/usag8-plan01`, `/media/diaszano`, `/home/diaszano`, `.ssh`, or `OPENAI_API_KEY=`.
- `dpkg-deb -e` contained only `control` and `md5sums`; no install/remove scripts. Desktop entry calls `usag8` and references icon `usag8`.
- Branding remains provisional; the included icon is not cleared for public release.
