# Keyboard and viewport QA

Run against the native Linux Mint Cinnamon/X11 build. Record `PASS`, `FAIL`, or `UNTESTED` with the build and environment; browser-only checks do not establish native support.

## Keyboard and pointer scenarios

| Scenario | Expected behavior | Result |
| --- | --- | --- |
| Tab from page start through navigation and provider list | Visible focus follows DOM order; provider rows have a clear focus outline. | UNTESTED |
| Focus a provider row with Tab | The same provider preview shown on hover appears; focus stays on the row. | PASS on packaged binary, Cinnamon/X11, 2026-11-02 |
| Activate a focused provider with Enter or Space | Open that provider's details. | Enter PASS on packaged binary; Space native runtime UNTESTED |
| Press Esc while a provider preview is open | Dismiss the preview and keep focus on its provider row. | PASS on packaged binary; focus outline remained on trigger |
| Move pointer over a provider row | Show the same preview as keyboard focus. | PASS on packaged binary, Cinnamon/X11 |
| Move pointer from a provider row into its preview | Preview stays visible while the pointer remains inside the row-and-preview group. | UNTESTED at runtime; implementation and Svelte checks pass |
| Focus a provider with an unavailable metric or generic error state | Show `—`, unavailable quality, and generic state; never expose raw error text. | Null/error mapper unit test PASS; generic not-connected preview PASS on packaged binary |
| Activate a provider row on a pointer with no hover | Open provider details; the preview is not required to use the app. | Keyboard Enter path PASS; no-hover hardware UNTESTED |
| Use touch or another pointer without hover | Provider details remain available by activating the row; no hover is required. | UNTESTED |
| Enable forced reduced motion | Transitions and animations are absent; content and focus behavior still work. | CSS present; runtime UNTESTED |

## Viewport and appearance matrix

| Viewport / setting | Expected behavior | Result |
| --- | --- | --- |
| 1280×720 | Dashboard, details, settings, preview fit without horizontal scrolling. | PASS before Task 4; packaged dashboard/details also rendered at 1200×800 |
| 1024×768 | Compact sidebar remains keyboard accessible; no horizontal scrolling. | PASS before Task 4; task 4 changes only provider rows |
| 360×600 | In-app Quick View and controls fit without horizontal scrolling. | PASS before Task 4; task 4 changes only dashboard provider rows |
| Dark / Light / System | Text and controls remain readable; System follows OS preference changes. | Unit tests PASS; runtime UNTESTED |
| 125–200% scaling | Text and controls remain visible without horizontal scrolling. | 200% at 360×600 PASS before Task 4; other scales UNTESTED |

## Limits

No pixel-perfect match is claimed. Error-state visual injection and alternate desktop environments are outside this QA run unless explicitly recorded above.
