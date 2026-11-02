# Tauri performance observations — 2026-11-02

## Status

**MEASURED / ACCEPTED for Mint Cinnamon/X11.** Three release-window runs completed. Keyboard navigation, 1280×720 scrolling and an isolated offline launch pass. No numeric performance thresholds were specified, so the measurements are reported as a baseline rather than a numerical pass/fail claim.

## Environment and blocker

- Linux Mint 22.3 Cinnamon, X11, x86_64.
- The user installed Tauri's Linux development dependencies. `pkg-config` reports WebKitGTK 4.1 2.52.6, D-Bus 1.14.10, GTK 3.24.41, Ayatana AppIndicator 0.5.90, and librsvg 2.58.0. `libxdo-dev` 1:3.20160805.1-5build1 is installed; it does not provide an `xdo.pc` file.
- The checkout is on VFAT, so the exact source files were copied to `/tmp/usag8-plan01` on ext4 for dependency installation, Rust builds, and native runs. No product source code was changed.
- `npm run tauri build` completed the release profile in 1m23s and produced a 2.80 MiB DEB. The package was not installed.

## Repeatable method after prerequisites are available

1. Record distro, desktop, session, architecture, Rust/Cargo/Node/npm, and `pkg-config` versions for WebKitGTK, OpenSSL, D-Bus, xdo, AppIndicator, and librsvg. Keep X11 and Wayland as separate rows.
2. Run `npm run tauri build` once and record build time and errors separately; do not count build time as application startup.
3. Launch the built app and record process start to the first matching X11 window in `wmctrl -lp`. This is a window-appearance proxy, not a precisely timed first-render event. Confirm rendered UI separately. Repeat three launches and report each timing.
4. Leave each launch idle for five minutes. At first window, one minute, and five minutes, collect `%CPU` and RSS for the full process tree (Tauri plus WebKit child processes) using `ps`; sum both columns. Record the tree size and elapsed time.
5. Record whether the empty state renders, theme choice, resize behavior, focus/keyboard behavior, and terminal/WebKitGTK errors. Attach no credentials or provider data.

There are no invented pass/fail thresholds. Compare only the measured startup, idle resource use, and rendering behavior against the project's actual usability requirements once those requirements are approved.

## Measurements

All runs used the release binary `src-tauri/target/release/usag8` in the ext4 copy. Startup is process start to matching X11 window appearance, not a stopwatch measurement of the first fully painted frame. At startup, CPU is transiently elevated while WebKit initializes. RSS and CPU below sum `usag8`, `WebKitNetworkProcess`, and `WebKitWebProcess`.

| Run | Window visible | Startup process-tree CPU / RSS | 1 min idle CPU / RSS | 5 min idle CPU / RSS |
|---|---:|---:|---:|---:|
| 1 | 0.211 s | 134.1% / 232,336 KiB | 5.2% / 409,360 KiB | 1.4% / 409,388 KiB |
| 2 | 0.212 s | 141.4% / 231,820 KiB | 1.9% / 406,792 KiB | 0.3% / 406,792 KiB |
| 3 | 0.212 s | 170.5% / 232,500 KiB | 3.5% / 407,684 KiB | 1.1% / 407,756 KiB |

| Other measure | Result |
|---|---|
| Release build | PASS — release profile 1m23s; DEB bundle 2.80 MiB |
| Native rendering | PASS — actual Cinnamon/X11 window rendered the not-connected dashboard; themes were inspected in the app settings |
| Resize and scroll | PASS — wheel scrolling at 1280×720 moved content and revealed the full last provider row and source caveat |
| Themes | PASS — Light, Dark and System rendered; System resolved to Dark on this session |
| Keyboard | PASS — Tab moved focus through overview, assistants and settings; Enter opened settings |
| Offline | PASS — release app rendered in a user/network namespace with only loopback down; host networking remained connected |
| Runs | 3 / 3 completed, each idle for five minutes |
| Platform | Linux Mint 22.3 Cinnamon/X11 accepted as the current target; Wayland untested |

## GTK4/libadwaita comparison

Not started. The earlier failure was missing development packages before the app could run, not evidence of a Tauri rendering or desktop-integration blocker. Revisit only if a reproducible application-level blocker remains after the remaining UI checks.
