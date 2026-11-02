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
| Install/remove smoke | PASS (disposable Ubuntu container) | Installed and removed package `usag8` `0.1.0` in an ephemeral Ubuntu 24.04 container, not the personal host. See Task 3 notes; Cinnamon GUI/menu launch remains untested there. |

The app reads no provider credentials, performs no provider network request, and has no telemetry or updater. This report tracks an internal test package only.

## Package build and inspection

- Built with `npm run tauri build` from the ext4 source copy. The VFAT checkout's npm executable links are unusable, so task builds run in `/tmp/usag8-plan01` with only current source files mirrored.
- Initial package inspection found Cargo registry paths under `/home/diaszano/.cargo` embedded in the executable. Rebuilt with Rust `--remap-path-prefix` for the temporary workspace and Cargo cache, then inspected the new artifact.
- Final executable string checks found none of `/tmp/usag8-plan01`, `/media/diaszano`, `/home/diaszano`, `.ssh`, or `OPENAI_API_KEY=`.
- `dpkg-deb -e` contained only `control` and `md5sums`; no install/remove scripts. Desktop entry calls `usag8` and references icon `usag8`.
- Branding remains provisional; the included icon is not cleared for public release.

## Install/remove smoke

- Disposable environment: ephemeral Ubuntu 24.04 Docker container, amd64. It matches the package's Noble base but is not a Mint Cinnamon VM; installation ran as container root with `apt-get`, without `sudo` and without changing host packages.
- `apt-get install --no-install-recommends /tmp/usag8.deb`: PASS; package version `0.1.0` installed, `/usr/bin/usag8` and `/usr/share/applications/usag8.desktop` present, `ldd` reported no missing libraries.
- `apt-get remove usag8`: PASS; binary and desktop entry removed. A sentinel at `/root/.config/usag8/keep` remained unchanged. No app-created XDG data exists in this prototype.
- Menu launch is not testable in the headless container. Separately, launched the final packaged executable extracted from this DEB on Mint Cinnamon/X11 inside an isolated network namespace. Dashboard rendered with providers not connected; pointer hover opened the preview; Tab focused Codex and opened the same preview; Esc hid it while retaining focus; Enter opened Codex details. This was an extracted-binary smoke, not a menu launch from an installed package.
- No app network access, system tray, provider setup, theme change, or resize was exercised in this package smoke. Theme/viewport evidence remains in `docs/qa/keyboard-and-viewports.md` and the Plan 03 ledger.
