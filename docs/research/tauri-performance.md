# Tauri performance observations — 2026-11-02

## Status

**UNTESTED / DEFERRED.** No Tauri window started, so startup, idle RSS/CPU, and WebKitGTK rendering have no measurements. Do not use this report to accept or reject Tauri.

## Environment and blocker

- Linux Mint 22.3 Cinnamon, X11, x86_64.
- `npm run tauri dev` in an ext4 copy of the exact source reached Rust compilation, then failed because `pkg-config` could not find `dbus-1` (`libdbus-1-dev`).
- The environment diagnostic also reports missing `webkit2gtk-4.1`, `xdo`, Ayatana AppIndicator, and `librsvg-2.0` development files.
- No packages were installed. There were zero native launches and zero performance runs.

## Repeatable method after prerequisites are available

1. Record distro, desktop, session, architecture, Rust/Cargo/Node/npm, and `pkg-config` versions for WebKitGTK, OpenSSL, D-Bus, xdo, AppIndicator, and librsvg. Keep X11 and Wayland as separate rows.
2. Run `npm run tauri build` once and record build time and errors separately; do not count build time as application startup.
3. Launch the built app and time from process launch until the dashboard is usable. Repeat three cold launches and three warm launches where feasible; record each run and how the timing was taken.
4. For each of three launches, leave the dashboard idle for five minutes. Record PID, elapsed time, `%CPU`, and RSS in KiB at launch, one minute, and five minutes using `ps -p <PID> -o pid,etime,%cpu,rss,comm`. Capture any sustained trend with the desktop system monitor and note its sampling interval.
5. Record whether the empty state renders, theme choice, resize behavior, focus/keyboard behavior, and terminal/WebKitGTK errors. Attach no credentials or provider data.

There are no invented pass/fail thresholds. Compare only the measured startup, idle resource use, and rendering behavior against the project's actual usability requirements once those requirements are approved.

## Measurements

| Measure | Result |
|---|---|
| Tauri startup | UNTESTED — executable could not be built |
| Idle CPU / RSS | UNTESTED — no application process |
| WebKitGTK rendering | UNTESTED — no native window |
| Three-run samples | 0 / 3 — blocked before launch |
| X11 / Wayland | X11 environment identified; native behavior untested / Wayland untested |

## GTK4/libadwaita comparison

Not started. The observed failure is missing development packages before the application can run, not evidence of a Tauri rendering or desktop-integration blocker. Revisit only if a reproducible application-level blocker remains after the documented prerequisites are installed.
