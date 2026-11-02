# Linux Mint baseline — 2026-11-02

Environment evidence for Plan 01. No assistant data, credentials, or provider endpoints were accessed.

## Environment

Commands: `bash scripts/doctor.sh`, `uname -m`, `node --version`, `npm --version`, `rustc --version`, `cargo --version`, and `pkg-config --modversion <dependency>`.

| Check | Result |
|---|---|
| Distribution | PASS — Linux Mint 22.3 |
| Desktop / session | PASS — X-Cinnamon / x11 |
| Architecture | PASS — x86_64 |
| Node.js / npm | PASS — v26.13.0 / 11.20.0 |
| Rust / Cargo | PASS — rustc 1.99.1 (58cf8f9c3 2026-10-13) / cargo 1.99.1 (5f94df478 2026-08-27) |
| GCC / make / curl / wget / file | PASS — all commands available |
| OpenSSL | PASS — pkg-config reports 3.0.13 |
| D-Bus development files | PASS — `pkg-config` reports 1.14.10 |
| GTK 3 development files | PASS — `pkg-config` reports 3.24.41 |
| WebKitGTK 4.1 | PASS — `pkg-config` reports 2.52.6 |
| Ayatana AppIndicator | PASS — `ayatana-appindicator3-0.1` reports 0.5.90 |
| librsvg | PASS — `pkg-config` reports 2.58.0 |
| xdo | PASS — `libxdo-dev` 1:3.20160805.1-5build1 is installed and provides `/usr/include/xdo.h`; it does not provide an `xdo.pc` file, so `pkg-config --modversion xdo` is not a valid check |

The distro, desktop, session, and executable checks came from `scripts/doctor.sh`; dependency details above were checked separately. User-directory paths are omitted.

## Prerequisite comparison

Checked against the [Tauri Linux prerequisites](https://v2.tauri.app/start/prerequisites/) on 2026-11-02. The user installed the documented development packages. `pkg-config` now finds WebKitGTK 4.1, D-Bus, GTK 3, AppIndicator and librsvg. The xdo development package is installed but exposes no pkg-config module; the Tauri release build succeeds. OpenSSL remains available. No package installation was performed by the agent.

## Frontend and native checks

| Check | Result |
|---|---|
| Frontend check / tests / build | PASS — `npm run check`, `npm test` (4/4), and `npm run build` in an ext4 temporary copy; the repository is on vfat, where npm cannot create `.bin` symlinks |
| Browser smoke | PASS — Firefox headless at 1280×720 rendered all three providers as “Não conectado” with no usage values; browser-only, not a native window |
| Rust tests | PASS — `cargo test --manifest-path src-tauri/Cargo.toml` (1 passed; no failures) |
| Rust Clippy | PASS — `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings` |
| Native Tauri window | PASS — `npm run tauri dev` opened on Mint Cinnamon/X11; dashboard rendered with three providers disconnected and no usage percentages |
| Release build | PASS — `npm run tauri build` produced `usag8_0.1.0_amd64.deb` (2.80 MiB) in the temporary ext4 copy; package was not installed |
| Snapshot contract | PASS — Rust test confirms three `not_connected` providers, null usage and null `collected_at` |
| Dark / Light / System | PASS — each option rendered in the native settings screen; System resolved to Dark on this session; choice is not persisted |
| Native resize | PARTIAL — resized to 1280×720; window remained responsive, but the third provider row extended below the viewport and vertical scrolling was not verified |
| Keyboard navigation | PASS — Tab moved focus from “Visão geral” to “Assistentes” and then “Configurações”; Enter opened settings |
| Window close/reopen | PASS — closing the app window exited the process; launching the release binary opened a new window |
| Disconnected network | UNTESTED — system networking was not changed |
| Wayland session | UNTESTED — this machine reports X11 |

## Gate

**PARTIAL / DEFERRED** — native tests, Clippy, a real X11 window, release build, themes, keyboard navigation and three idle performance runs now pass. Keep ADR-0001 Deferred until scrolling at the 1280×720 viewport is verified; offline behavior and Wayland remain untested. The third provider row extends below the fold.
