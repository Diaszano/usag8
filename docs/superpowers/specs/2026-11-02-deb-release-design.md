# Local DEB packaging and Linux QA — design specification

**Status:** Proposed; blocked until Tauri stack accepted and product/app identifier reviewed.

## Requirements
- Build a local `.deb` from the existing Tauri 2 app, no cloud CI/release signing initially.
- Verify Tauri system dependencies using official docs, inspect package contents, non-root install/uninstall in a disposable test machine, desktop entry/icon and startup from application menu.
- Check that runtime remains usable without tray, overlay, global shortcut, network or provider credentials.
- Package identifier `dev.usag8.desktop` is provisional; brand/domain/trademark decision is not approved. Placeholder icon is **not final**.
- No auto-updater, telemetry, hidden privileged installer or scripts that read assistant data.
- Configuration/cache/data should follow XDG once persistence is added, and uninstall must not silently erase user data.

## Release gates
- Pass frontend + Rust tests and actual GUI smoke on Mint Cinnamon. Inspect dependency metadata and permissions. Record package version, architecture, installation and removal results.
- If identifier/brand is unresolved, build **internal testing package only**, not public release.

**Source:** https://v2.tauri.app/distribute/debian/ (verify on release date).
