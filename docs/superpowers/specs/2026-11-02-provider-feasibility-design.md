# First provider feasibility and source approval — design specification

**Status:** Proposed research gate. Does **not** authorize implementing a collector.

## Candidates
Claude Code, OpenAI Codex, Antigravity, OpenCode and Cursor. The existing prototype enumerates only the first three. Do not assume any candidate provides official quotas or an allowed programmatic interface.

## Evidence required per source
- Official documentation URL, retrieval date and API/CLI version.
- Data exposed: usage vs quota vs session; time window; reset time; units; model/account scope; source semantics.
- Access method and terms/policy, with link; required permissions; credentials handling; network or local read-only access; rate limits.
- Stability, portability, absence-of-tool behavior, offline behavior, errors, privacy, and ability to test without real secrets.
- Classification: Confirmado / Estimado / Indisponível. Local token logs do not equal official subscription allowance.

## Selection gate
- Select **one** provider only if data source and permission are confirmed. ADR must state precisely which metrics are permitted and which aren't.
- If no provider passes: record `NO-GO`; keep app in not-connected mode, do not scrape private undocumented endpoints or parse protected credential files.
- Collector architecture, if approved in a *new* plan: isolated Rust module, bounded read-only IO, no command execution unless reviewed, deterministic sanitized fixtures, never logging secrets; one failure isolated from others.

## Deliverables
`docs/research/provider-source-matrix.md`, one ADR, and a follow-up implementation plan only after source approval. Sources are time-sensitive; revalidate before code.
