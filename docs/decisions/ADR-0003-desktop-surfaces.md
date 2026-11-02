# ADR-0003: Keep desktop surfaces in-app for the MVP

- **Status:** Accepted for MVP scope
- **Date:** 2026-11-02
- **Context:** Linux Mint Cinnamon/X11 is the reference environment. AppIndicator support, dynamic panel text, focus behavior, scaling, multi-monitor behavior, and Wayland behavior have not been experimentally verified. The plan requires separate approval before native surface experiments. Core dashboard and Quick View already work inside the application window.
- **Decision:** Keep provider states and Quick View in the app. Do not add an AppIndicator dependency, panel text, close-to-tray behavior, global hotkey, or floating sidebar to the MVP. These remain deferred until an authorized, isolated desktop-specific spike records measured behavior.
- **Consequences:** The MVP works without panel hosting. Users must open the application to see provider state. No cross-desktop or Wayland support is implied by the X11 validation.
- **Revisit when:** A separate native experiment is approved and confirms a useful, accessible fallback on the target desktop(s).
