# ADR-0001 — Tauri stack candidate (proposed, not approved)

Status: **Deferred**
Date: 2026-11-02

## Context
Usag8 is a Linux desktop assistant-usage monitor, currently designed in Penpot. Target development environment: Linux Mint Cinnamon, with GNOME and KDE compatibility as goals.

## Proposal
Spike with Tauri 2 + Rust + Svelte 5 + TypeScript + Vite. Avoid SQLite and OS integrations initially. If WebKitGTK overhead, rendering or desktop integration fail material requirements, evaluate GTK4/libadwaita with a focused comparison rather than assuming Tauri wins.

## Decision gates
1. Build/run on actual Mint Cinnamon; X11/Wayland differences documented.
2. Measure startup, idle memory/CPU and packaging dependencies.
3. Confirm basic keyboard, themes and screen scaling.
4. Verify that only read-only local providers with trustworthy data will be integrated later.

## Pending approval
Identifier (`dev.usag8.desktop`) is a temporary placeholder, not a commercial namespace or trademark clearance. Do not publish packages with it without review.

## Evidence update — 2026-11-02
The Linux Mint 22.3 Cinnamon/X11 baseline is recorded in `docs/research/linux-mint-baseline.md`. The frontend check, tests, build, and browser-only smoke passed in an ext4 copy. Native Rust tests, Clippy, and `npm run tauri dev` could not pass the missing `dbus-1` development dependency; WebKitGTK 4.1, xdo, Ayatana AppIndicator, and librsvg are also absent. No native window or performance sample was collected.

Decision remains **Deferred** until the missing prerequisites are available and the native checks, GUI matrix, and performance observations in `docs/research/tauri-performance.md` are completed. This is an environment blocker, not evidence for replacing Tauri. Do not pass downstream stack-acceptance gates yet.
