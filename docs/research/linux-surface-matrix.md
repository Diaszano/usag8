# Linux desktop surface capability matrix

Observed on 2026-11-02. An `UNTESTED` cell is not a compatibility claim.

## Environment

- Distribution: Linux Mint 22.3 Zena
- Desktop: Cinnamon 6.6.9 (`X-Cinnamon`)
- Session: X11
- Core app without panel integration: PASS on this Mint Cinnamon/X11 environment (Plan 01 offline launch and Plan 03 in-app Quick View)

## Capabilities

| Desktop | Session | Indicator | Dynamic text | Keyboard focus | Scaling / multiple displays | Fallback |
| --- | --- | --- | --- | --- | --- | --- |
| Cinnamon 6.6.9 | X11 | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app dashboard/Quick View PASS |
| Cinnamon | Wayland | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app UI designed without panel support |
| GNOME | X11 | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app UI designed without panel support |
| GNOME | Wayland | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app UI designed without panel support |
| KDE Plasma | X11 | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app UI designed without panel support |
| KDE Plasma | Wayland | UNTESTED | UNTESTED | UNTESTED | UNTESTED | In-app UI designed without panel support |

No AppIndicator, panel text, close-to-tray, multi-monitor, or compositor experiment was run. Those experiments require a separately approved native spike. This matrix records observed OS/session facts and marks unobserved capabilities explicitly.
