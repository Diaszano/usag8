# Superpowers installation and use

Superpowers is a development *methodology/plugin* (https://github.com/obra/superpowers). Install it in your coding agent separately. **Do not vendor upstream skills** into this repository or treat project AGENTS.md as a Superpowers installation.

## Antigravity
Run from an environment where the `agy` CLI is installed:

```bash
agy plugin install https://github.com/obra/superpowers
```

## Codex CLI
Use `/plugins`, search Superpowers, select Install Plugin. The current official README also points to this method; check it for changes.

## Claude Code
From Claude Code plugin interface:

```text
/plugin install superpowers@claude-plugins-official
```

## Workflow
1. Start with brainstorming and a written design for anything substantial.
2. After explicit design approval, use writing-plans to create small implementation tasks.
3. Create a worktree if the skill recommends it.
4. Execute with test-driven-development; review and verify before completion.
5. When completing a branch, run checks and document unresolved risks.

## First agent task (copy/paste into your coding agent)

> Read AGENTS.md, docs/stack.md and docs/plans/2026-11-01-mvp-validation.md. Use Superpowers to inspect this repository. Validate the Tauri 2 / WebKitGTK stack on my actual Linux Mint Cinnamon session. Run the diagnostic, npm check and frontend tests; then cargo tests and an actual Tauri dev run. Do not implement provider data access yet. Report concrete measurements and blockers before proposing changes.

Keep this limited to development-agent tools. The Usag8 app itself must not require Superpowers.

## Scoped plans (2026-11-02)
Use [`docs/superpowers/README.md`](superpowers/README.md) as the plan queue. New implementation plans live in `docs/superpowers/plans/` with corresponding design specs in `docs/superpowers/specs/`, matching the current upstream writing-plans convention.

The original `docs/plans/2026-11-01-mvp-validation.md` is historical, not the active queue. No checkboxes in the new plans have been completed.
