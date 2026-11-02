# Quick View and Linux desktop surfaces — design specification

**Status:** Proposed, experimental. Does not grant permission for global overlays/system tray integration yet.
**Penpot:** `06 · Floating Sidebar & Menu Bar`, `03 · Quick View`, `09 · Navigation & Responsive`.

## Core (available everywhere)
- Inside-app Quick View and compact provider labels work independently of the host desktop environment and require no tray, hotkey or overlay.
- Display per-provider quality/state/period when available; unavailable `—` means missing, not 0%; never merge incompatible quotas.
- Hover/focus preview and click-to-details remain keyboard accessible, with Esc to close transient preview.

## Linux optional experiments
- On actual Cinnamon session determine X11 vs Wayland, panel hosting and indicator capabilities. GNOME Shell is not Cinnamon; GNOME/KDE must be separately observed.
- Experiment with AppIndicator/text-in-panel only as an independent spike; do not claim arbitrary dynamic text will work on all panels.
- Test activation, visibility, multiple monitors, display scaling, close-to-tray fallback, restart behavior, and accessibility.
- A truly global floating sidebar is deferred until compositor-specific constraints are known. Never rely on unsupported always-on-top placement for core UX.

## Deliverables and exit
- In-app Quick View complete and tested; desktop capability matrix with pass/fail/untested; decision ADR for each optional integration; no new runtime dependency unless accepted.
