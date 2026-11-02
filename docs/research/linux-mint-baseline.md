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
| D-Bus development files | FAIL — `pkg-config` cannot find `dbus-1` |
| WebKitGTK 4.1 | FAIL — `pkg-config` cannot find `webkit2gtk-4.1` |
| xdo / Ayatana AppIndicator / librsvg | FAIL — `pkg-config` cannot find `xdo`, `ayatana-appindicator3`, or `librsvg-2.0` |

The distro, desktop, session, and executable checks came from `scripts/doctor.sh`; dependency details above were checked separately. User-directory paths are omitted.

## Prerequisite comparison

Checked against the [Tauri Linux prerequisites](https://v2.tauri.app/start/prerequisites/) on 2026-11-02. Tauri lists WebKitGTK 4.1 and Linux build/system dependencies including OpenSSL, xdo, AppIndicator, and librsvg. The local checks confirm OpenSSL, but report WebKitGTK 4.1, xdo, AppIndicator, and librsvg missing. The Rust build also reported missing `dbus-1` development files. No packages were installed.

## Frontend and native checks

| Check | Result |
|---|---|
| Frontend check / tests / build | PASS — `npm run check`, `npm test` (4/4), and `npm run build` in an ext4 temporary copy; the repository is on vfat, where npm cannot create `.bin` symlinks |
| Browser smoke | PASS — Firefox headless at 1280×720 rendered all three providers as “Não conectado” with no usage values; browser-only, not a native window |
| Rust tests / Clippy | FAIL — `libdbus-sys` cannot find `dbus-1.pc`; compilation stopped before project tests |
| Native Tauri window | FAIL — `npm run tauri dev` stopped at the same missing `dbus-1` prerequisite; no window opened |
| Snapshot contract | PASS by source inspection — three provider IDs, all `not_connected`, `usage: None`, `collected_at: None`; Rust assertion remains unexecuted |
| Dark / Light / System, native resize, keyboard, close/reopen, offline, notifications | UNTESTED |
| Wayland session | UNTESTED — this machine reports X11 |

## Gate

**FAIL / STOP** — the required WebKitGTK 4.1 development dependency is unavailable, so a valid native Tauri build and GUI run cannot be claimed. Native build, window behavior, themes, keyboard navigation, sizing, notifications, Wayland, and performance remain **UNTESTED**. Re-run the diagnostic after dependencies are supplied, then continue Plan 01.
