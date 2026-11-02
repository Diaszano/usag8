# Penpot-to-Svelte UI, responsive layout and accessibility — design specification

**Status:** Proposed. Implements UI behavior, not provider integrations.
**Design reference:** Penpot file `Aplication`, pages `01 · Dashboard`, `03 · Quick View`, `04 · Provider Details`, `05 · Settings`, `08 · States & Recovery` and `09 · Navigation & Responsive`.

## Visual system
- Current reference color tokens live in `src/app.css` for Dark/Light; use those before inventing new palette values.
- Dark / Light / System, system preference changes at runtime. Do not save preference until storage is approved.
- Dashboard and provider details work at 1280×720; compact side rail at 1024×768; Quick View internal layout at 360×600. Desktop native minimum window size must be evaluated, not silently reduced.
- Explicit origin, update time, unit, quality and period for any *real* metric; all current data is unavailable.
- Design is inspired by Metria's functionality only, without copying its identity.
- Brand assets from Google, Runeicons or others require recorded source/permission and original proportions. Until approval, fallback initials are acceptable. No remote icon fetch at runtime.

## Accessibility
- Tab/Shift+Tab through navigation and provider actions; Enter/Space activate; Esc dismisses transient previews and restores focus when relevant.
- A hover preview must be equally discoverable with focus/click. Icon-only controls need accessible label + tooltip; no color-only state.
- Visible focus, 4.5:1 ordinary text contrast target, reduced-motion mode, no horizontal overflow at intended viewports.
- No OS overlay, global hotkeys or tray dependency; internal compact view must work by itself.

## User outcomes
- Click provider => details; back => dashboard; settings accessible from every page; missing/failed provider has a recovery explanation.
- All prototypes are labeled not connected and avoid the illustrative 62%/27% percentages in live UI.
- Responsive QA checked with desktop webview, not Penpot alone.
