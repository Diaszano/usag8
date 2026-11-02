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
The user installed the required Linux development packages. In an ext4 copy of the source, Rust tests passed (1/1), Clippy passed with `-D warnings`, `npm run tauri dev` opened a real Cinnamon/X11 window, and `npm run tauri build` produced a DEB bundle. The rendered dashboard showed all three providers not connected with unavailable usage. Light, Dark and System themes rendered; closing and relaunching the release binary reopened the window.

Three five-minute idle runs measured process-tree RSS of about 407–409 MiB and CPU of 0.3–1.4% at five minutes. The observed 0.211–0.212 second startup is process start to X11 window appearance, not a precise first-paint measurement. At 1280×720 the third provider row extends below the visible area; vertical scrolling and keyboard navigation have not been verified. Offline mode and Wayland remain untested. See `docs/research/linux-mint-baseline.md` and `docs/research/tauri-performance.md`.

Decision remains **Deferred**: no usability thresholds were approved, and keyboard navigation plus the 1280×720 overflow behavior still need verification before passing downstream stack-acceptance gates. No evidence currently justifies replacing Tauri with GTK4/libadwaita.
