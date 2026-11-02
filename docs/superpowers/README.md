# Usag8 — Superpowers work queue (2026-11-02)

**Status:** Plans 01–05 are complete within their gates. Plan 01 is accepted for Linux Mint Cinnamon/X11; Plan 04 is NO-GO for a provider collector; Plan 05 native surfaces are deferred. Plan 06's internal DEB is built and container-smoke-tested; installed-package launch from the Mint Cinnamon menu remains pending a disposable Mint VM or explicit approval to install/remove it on the personal host. Public release remains blocked by the branding gate.

## How to use

1. Read project `AGENTS.md`, `docs/stack.md`, and the corresponding **Spec** before each plan.
2. Use `superpowers:brainstorming` if an open product decision must be approved first.
3. For an approved, scoped design, invoke `superpowers:writing-plans` to refine/update the relevant file if the repository has changed.
4. Execute via `superpowers:subagent-driven-development` when the agent supports subagents, otherwise `superpowers:executing-plans`. Work in a clean branch/worktree; TDD and real tests are mandatory.
5. Plan checkboxes track completed actions; results and failures remain in evidence and SDD ledgers. A checked action is not necessarily a passing gate. A plan is not permission to read credentials or use undocumented provider endpoints.

## Plans and dependencies

| Order | Plan | Spec | Gate | Status |
|---|---|---|---|---|
| 01 | [Linux stack validation](plans/2026-11-02-01-linux-stack-spike.md) | [Spec](specs/2026-11-02-linux-spike-design.md) | First; run on user's Mint Cinnamon | Complete — accepted for Mint Cinnamon/X11; Wayland untested |
| 02 | [Snapshot integrity & recovery](plans/2026-11-02-02-snapshot-integrity.md) | [Spec](specs/2026-11-02-snapshot-and-states-design.md) | After 01 Accepted | Complete |
| 03 | [Penpot UI, navigation & A11y](plans/2026-11-02-03-penpot-ui-and-accessibility.md) | [Spec](specs/2026-11-02-penpot-ui-design.md) | After 01 Accepted; 02 contract first | Complete — documented QA gaps remain |
| 04 | [First provider feasibility](plans/2026-11-02-04-provider-source-feasibility.md) | [Spec](specs/2026-11-02-provider-feasibility-design.md) | Research only; no connector until source ADR/user approval | Complete — NO-GO for current scope |
| 05 | [Quick View & Linux surface evaluation](plans/2026-11-02-05-quick-view-and-linux-surfaces.md) | [Spec](specs/2026-11-02-linux-surfaces-design.md) | In-app after 03; native experiments separately approved | Complete — in-app; native integrations deferred |
| 06 | [Internal DEB & QA](plans/2026-11-02-06-deb-package-and-qa.md) | [Spec](specs/2026-11-02-deb-release-design.md) | After 01 Accepted + stable UI and tests | Partial — final Mint installed-menu smoke pending |

Plans 02 and 04 contain independent strands: source research may happen in parallel with pure frontend work, **but no provider-collection code** until 04 approves a specific source. Plan 05 native desktop integrations and Plan 06 installed-menu smoke/public release remain gated; in-app Quick View and the internal DEB build are complete.

## What remains intentionally unplanned

- A **real first-provider adapter**: create a new source-specific spec and plan only after Plan 04's ADR identifies and approves exact documented source/metrics/permissions. Never invent endpoints.
- **SQLite, history, alerts, snapshots, background polling**: design after a working provider and real data retention need are confirmed.
- **Global floating sidebar, system panel text, hotkeys**: compositor/desktop spike and user approval before implementation.
- **Public branding/release**: trademark/name/identifier and logo-rights checks before distribution.

## Original start prompt (historical; Plan 01 is complete)

> Read `AGENTS.md`, `docs/superpowers/README.md`, `docs/superpowers/specs/2026-11-02-linux-spike-design.md`, and `docs/superpowers/plans/2026-11-02-01-linux-stack-spike.md`. Inspect the actual repository state. Apply the appropriate Superpowers skills and propose an isolated worktree. Execute **only Plan 01** on my Linux Mint Cinnamon machine; record real test results and do not access providers or credentials. Stop at missing dependencies or unapproved privileged changes.

**Older historical plan:** `docs/plans/2026-11-01-mvp-validation.md` is retained as context. Use the newer versioned plans above for execution.

**Upstream reference:** <https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md>.
