# Usag8 roadmap and decision gates

| Phase | Output | Explicit approval needed | Not in phase |
|---|---|---|---|
| P0 — baseline | Tauri stack accepted/deferred/rejected with measurements | Any system package install/architecture decision | Provider access, tray, history |
| P1 — truthfulness | Typed snapshot, input validation, isolated errors & state UX | Data contract extension | Quota scraping, background IO |
| P2 — UI | Responsive Dashboard, Details, Settings, internal Quick View | UI acceptance | Global overlay, Linux panel text |
| P3 — source research | Source matrix + single provider GO/NO-GO; completed by Plan 07 with NO-GO | Permission/source/metric approval | Unverified API implementation |
| P4 — provider MVP | No implementation authorized; requires a source that passes every gate, explicit user approval, then a new provider-specific plan | **Source-specific approval and plan required** | Unrelated providers, SQLite by default |
| P5 — Linux polish | Optional panel/tray feasibility and fallback | Native plugins/desktop dependencies | Required GNOME extension or global UI |
| P6 — internal bundle | DEB install/uninstall smoke | Stack + branding gate | Public release |
| P7 — later | History/alerts/SQLite only from real need | Storage, retention, polling policy | Cloud sync, telemetry by default |

For each phase, capture red/green tests, actual commands, result logs and a small commit; **do not claim platform support based on Penpot or browser-only testing**.
