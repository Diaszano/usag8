# ADR-0002: First provider source

- **Status:** NO-GO for the current product scope (2026-11-02).
- **Source:** None approved.
- **Metric(s):** None collected or displayed. Keep all providers `not_connected` and usage unavailable.
- **Permission scope:** None. This decision authorizes no app access to provider accounts, local credentials, usage files, or provider endpoints.
- **Testing fixtures:** None for a collector because no source is approved. Any future plan must use deterministic sanitized fixtures, never real account data or secrets.
- **Risks:** Public docs and terms can change; re-check before any future implementation. Treating session cost/tokens as subscription quota would mislead users. An undocumented interface or excessive credential scope could expose account/team data.

## Evidence and rejected alternatives

- **Claude Code:** The official [status-line schema](https://code.claude.com/docs/en/statusline) documents five-hour and seven-day rate-limit usage percentages and reset timestamps for eligible Claude.ai plans, after the first API response. This is useful confirmed session-fed data, but it requires a user-configured script and running session; there is no documented standalone app quota API or app-readable export. Forwarding status-line JSON also requires handling session metadata. Source is technically present, but integration is not approved without explicit source-specific consent and an acceptable data handoff design.
- **OpenAI Codex:** The [App Server](https://learn.chatgpt.com/docs/app-server) documents `account/rateLimits/read` with used percentage, quota window length, reset timestamp, and bucket IDs. This corrects the earlier finding that no machine-readable method was documented. However, the App Server command and WebSocket transport are experimental and unsupported for production workloads, and App Server authentication has never been permitted for commercial or hosted services. With commercial use in scope and no production-supported auth/interface established, this source is not approved for usag8.
- **Antigravity:** Official docs describe per-model quota and read-only structured `agy -p "/usage"` output. The exact standalone output schema is unpublished, and the [Additional Terms](https://antigravity.google/terms) prohibit third-party software/tools/services from accessing the service without clarifying that a third-party app invoking the CLI is exempt. Rejected for this app pending written policy clarification; do not invoke the CLI from usag8.
- **OpenCode:** `GET /api/experimental/usage/limits` documents Go allowances and Console budgets, but the route is explicitly experimental and its access scope and stability are not sufficient for an integration. Deferred until a stable documented interface and least-privilege boundary exist.
- **Cursor:** The documented Team Admin API exposes team usage and member identifiers through an organization-admin key. This is excessive for an individual quota display; rejected for the current product scope.
- **OpenAI Codex UI/CLI:** Official user-facing `/status` and usage pages show plan usage/reset, but the reviewed integration option is the experimental App Server above. No UI scraping or undocumented API is approved.
- **Claude Code CLI run output:** Run cost remains distinct from subscription quota. Do not substitute run cost, token logs, or Console API usage for the documented status-line rate-limit fields.

## Next gate

Do not write a collector plan until the user approves one exact source and its policy/access gate passes. Reopen feasibility only when an official documented source offers a supported, stable machine-readable quota path, permitted access, and minimum privilege. For Claude Code this requires an approved status-line handoff that avoids unnecessary session metadata. For Codex it requires a production-supported interface and an authentication path allowed for the product's commercial scope. For Antigravity this requires explicit clarification that the exact third-party app/CLI invocation is allowed and a published output schema; for OpenCode it requires a stable quota route and verified local server access controls. Any future plan must name exact fields, bounded IO, failure behavior, and sanitized fixtures. Until then retain the not-connected state.
