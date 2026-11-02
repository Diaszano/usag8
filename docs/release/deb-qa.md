# Internal DEB QA record

## Preflight

| Gate | Result | Evidence |
| --- | --- | --- |
| Tauri stack accepted for target | PASS | ADR-0001 accepted for Linux Mint Cinnamon/X11; Wayland is untested. |
| Identity/public release clearance | INTERNAL-ONLY | `usag8`, `dev.usag8.desktop`, and placeholder icons are provisional. See `branding-gate.md`. |
| Build environment | PASS | Linux Mint 22.3 Zena, Cinnamon 6.6.9, X11, x86_64. |
| Tauri capabilities | PASS | `src-tauri/capabilities/default.json` grants only `core:default` to window `main`; no shell or broad filesystem permission. |
| Frontend / Rust quality gates | PASS | In ext4 copy: `npm ci --offline` (72 packages, audit reported 0 vulnerabilities); `npm run check` (0 errors, 0 warnings); `npm test` (44 passed); `npm run build` passed; `cargo test --manifest-path src-tauri/Cargo.toml` (1 passed); `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings` passed. |
| DEB artifact contents / dependencies | PASS | `usag8_0.1.0_amd64.deb`, package `usag8`, version `0.1.0`, amd64, 2,932,726 bytes; Depends: `libwebkit2gtk-4.1-0`, `libgtk-3-0`; contains `/usr/bin/usag8`, desktop entry and 32/128/256px app icons. No maintainer scripts. |
| Install/remove and desktop launch | PASS | Install/remove passed in an ephemeral Ubuntu 24.04 container. The final DEB installed in a disposable Mint 22.3 live VM, appeared in Cinnamon menu search, and launched the dashboard. No package was installed on the personal host. |

The app reads no provider credentials, performs no provider network request, and has no telemetry or updater. This report tracks an internal test package only.

## Package build and inspection

- Built with the following command from the ext4 source copy. The VFAT checkout's npm executable links are unusable, so task builds run in `/tmp/usag8-plan01` with only current source files mirrored:
  ```sh
  BUILD_PREFIX="$PWD"
  CARGO_PREFIX="${CARGO_HOME:-$HOME/.cargo}"
  RUSTFLAGS="--remap-path-prefix=$BUILD_PREFIX=/workspace --remap-path-prefix=$CARGO_PREFIX=/cargo" npm run tauri build
  ```
- Initial package inspection found Cargo registry paths under `/home/diaszano/.cargo` embedded in the executable. Rebuilt with Rust `--remap-path-prefix` for the temporary workspace and Cargo cache, then inspected the new artifact.
- Final executable string checks found none of `/tmp/usag8-plan01`, `/media/diaszano`, `/home/diaszano`, `.ssh`, or `OPENAI_API_KEY=`.
- `dpkg-deb -e` contained only `control` and `md5sums`; no install/remove scripts. Desktop entry calls `usag8` and references icon `usag8`.
- Branding remains provisional; the included icon is not cleared for public release.

## Install/remove smoke

- Disposable environment: ephemeral Ubuntu 24.04 Docker container, amd64. It matches the package's Noble base but is not a Mint Cinnamon VM; installation ran as container root with `apt-get`, without `sudo` and without changing host packages.
- `apt-get install --no-install-recommends /tmp/usag8.deb`: PASS on the package built before the final preview-only fix; package version `0.1.0` installed, `/usr/bin/usag8` and `/usr/share/applications/usag8.desktop` present, `ldd` reported no missing libraries. The final package was rebuilt after that fix; package metadata/dependencies did not change.
- `apt-get remove usag8`: PASS; binary and desktop entry removed. A sentinel at `/root/.config/usag8/keep` remained unchanged. No app-created XDG data exists in this prototype.
- Installed the final `usag8_0.1.0_amd64.deb` into a disposable Linux Mint 22.3 Cinnamon live VM using the read-only host share. Cinnamon menu search found the installed `usag8` entry; launching it rendered the dashboard with three example providers marked `Não conectado`, unavailable limits, and no collection timestamp. This confirms the installed desktop entry and launch path on Cinnamon.
- Separately, launched the final packaged executable extracted from this DEB on Mint Cinnamon/X11 inside an isolated network namespace. Dashboard rendered with providers not connected; hover preview remained visible while pointer was over it and closed after leaving the group; Tab/focus showed the same preview; Esc closed a hover-open preview while restoring focus to the trigger; Enter opened provider details.
- No app network access was available during the extracted-binary smoke; no system tray or provider setup was used. Theme changes and window resizing were not rechecked in this package smoke; theme/viewport evidence and remaining gaps are in `docs/qa/keyboard-and-viewports.md` and the Plan 03 ledger.

## Publication gate

- **INTERNAL-ONLY.** Name, domain, package namespace, and final icon provenance remain unresolved; see `branding-gate.md`.
- Supported desktop evidence is limited to Linux Mint 22.3 Cinnamon/X11; Wayland and other desktops remain untested. The install/remove container used Ubuntu 24.04 packages.
- No auto-updater, telemetry, provider network access, credentials, or install/remove scripts are present. The passing internal package is not public-release approval.
