# Keyboard and viewport QA

Run against the native Linux Mint Cinnamon/X11 build. Record `PASS`, `FAIL`, or `UNTESTED` with the build and environment; browser-only checks do not establish native support.

## Keyboard and pointer scenarios

| Scenario | Expected behavior | Result |
| --- | --- | --- |
| Tab from page start through navigation and provider list | Visible focus follows DOM order; provider rows have a clear focus outline. | UNTESTED |
| Focus a provider row with Tab | The same provider preview shown on hover appears; focus stays on the row. | UNTESTED at runtime; implementation and Svelte checks pass |
| Activate a focused provider with Enter or Space | Open that provider's details. | PASS before Task 4; native runtime not repeated |
| Press Esc while a provider preview is open | Dismiss the preview and keep focus on its provider row. | UNTESTED at runtime; implementation and Svelte checks pass |
| Move pointer over a provider row | Show the same preview as keyboard focus. | UNTESTED at runtime; implementation and Svelte checks pass |
| Use touch or another pointer without hover | Provider details remain available by activating the row; no hover is required. | UNTESTED |
| Enable forced reduced motion | Transitions and animations are absent; content and focus behavior still work. | CSS present; runtime UNTESTED |

## Viewport and appearance matrix

| Viewport / setting | Expected behavior | Result |
| --- | --- | --- |
| 1280×720 | Dashboard, details, settings, preview fit without horizontal scrolling. | UNTESTED |
| 1024×768 | Compact sidebar remains keyboard accessible; no horizontal scrolling. | PASS before Task 4; task 4 changes only provider rows |
| 360×600 | In-app Quick View and controls fit without horizontal scrolling. | PASS before Task 4; task 4 changes only dashboard provider rows |
| Dark / Light / System | Text and controls remain readable; System follows OS preference changes. | Unit tests PASS; runtime UNTESTED |
| 125–200% scaling | Text and controls remain visible without horizontal scrolling. | 200% at 360×600 PASS before Task 4; other scales UNTESTED |

## Limits

No pixel-perfect match is claimed. Error-state visual injection and alternate desktop environments are outside this QA run unless explicitly recorded above.
