# Internal DEB Package and Linux QA Implementation Plan

**Execution status:** Complete within the internal-only gate. The internal DEB build, metadata inspection, container install/remove, extracted-binary Mint/X11 smoke, and installed-package Cinnamon menu launch in a disposable Mint 22.3 live VM passed. Public branding clearance is unresolved; the artifact remains internal-only.


> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkboxes for tracking.

**Goal:** Produce and smoke-test a local internal `.deb` for Mint Cinnamon, with honest branding/release gates.

**Architecture:** Use Tauri's existing DEB bundler after native stack acceptance; verify artifact metadata, dependencies and desktop behavior in a disposable machine before considering any public release.

**Tech Stack:** Tauri 2, Rust, npm, Debian tools (`dpkg-deb`, `dpkg`, `apt`), Mint Cinnamon.

**Spec:** `docs/superpowers/specs/2026-11-02-deb-release-design.md`

## Global Constraints
- Requires Plan 01 ADR status **Accepted** and build/test evidence; otherwise STOP.
- `dev.usag8.desktop` and placeholder icons are provisional, not cleared for public release.
- No credentials, network telemetry, auto-updaters or privileged install scripts inside the package.
- DEB is first internal target only. No promise of universal Linux compatibility.

## Review Focus
1. Missing WebKitGTK runtime dependency => installation/launch fails; record and block — Task 2.
2. Package silently bundles tokens/dev paths => reject artifact — Task 2.
3. Uninstall deletes user configuration/data => reject destructive behavior — Task 3.
4. Desktop entry/icon missing or broken => block release — Task 3.
5. Unknown trademark/identifier => private/internal artifact only — Task 4.

## File map
- Existing: `src-tauri/tauri.conf.json`, `src-tauri/icons/*`, `package.json`.
- Create: `docs/release/deb-qa.md`, `docs/release/branding-gate.md`.
- Modify config only when verified on target machine; avoid adding install hooks.

### Task 1: Preflight and source freeze

**Files:** Create `docs/release/deb-qa.md`; Read `docs/decisions/ADR-0001-stack-evaluation.md` and `src-tauri/tauri.conf.json`.

**Interfaces:** Gate `PASS/FAIL/UNTESTED` for accepted stack, internal-only identity, current distro/session, and test commands.

- [x] **Step 1: Verify gate.** Inspect accepted ADR; if not **Accepted**, document blocker and STOP instead of building.
- [x] **Step 2: Run project quality gates.** `npm ci && npm run check && npm test && npm run build` plus `cargo test --manifest-path src-tauri/Cargo.toml` and `cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings`. Expected all PASS.
- [x] **Step 3: Confirm security posture.** Review Tauri capabilities: `src-tauri/capabilities/default.json` only minimal commands, no shell or broad filesystem access. Record actual permissions.
- [x] **Step 4: Commit QA baseline.** `git add docs/release/deb-qa.md && git commit -m "docs: establish internal package preflight"`.

### Task 2: Local DEB build and inspection

**Files:** Read/conditionally Modify `src-tauri/tauri.conf.json`; Modify `docs/release/deb-qa.md`.

**Interfaces:** A real bundle artifact under `src-tauri/target/release/bundle/deb/` (exact filename determined from build output, never guessed).

- [x] **Step 1: Run actual build on compatible Mint.** `npm run tauri build`; expected CLI success or a recorded blocker.
- [x] **Step 2: Inspect actual output.** Identify artifact with `find src-tauri/target/release/bundle/deb -maxdepth 1 -name '*.deb' -type f -print`; do not fabricate filenames.
- [x] **Step 3: Inspect metadata and contents.** Run `dpkg-deb -I <verified-file.deb>` and `dpkg-deb -c <verified-file.deb>`; record dependencies, desktop file, icons, no credentials/test fixtures/private paths. Record package size and architecture.
- [x] **Step 4: Fix only reproducible bundle defect.** If dependencies or assets are wrong, modify `src-tauri/tauri.conf.json` minimally, rebuild, and re-run inspection.
- [x] **Step 5: Commit config/report.** `git add src-tauri/tauri.conf.json docs/release/deb-qa.md && git commit -m "build: verify internal DEB metadata"` (omit unchanged files).

### Task 3: Install/uninstall smoke in disposable environment

**Files:** Modify `docs/release/deb-qa.md`.

**Interfaces:** Tested commands and observations, no hidden installer; manual user approval before installation on personal machine.

- [x] **Step 1: Select disposable system.** Used an ephemeral Ubuntu 24.04 container for install/remove and a verified Linux Mint 22.3 Cinnamon live VM for the desktop-menu check. No package was installed on the personal host.
- [x] **Step 2: Install package.** Installed the verified DEB in the container; `/usr/bin/usag8`, desktop entry, and runtime libraries were present.
- [x] **Step 2b: Launch the installed package from the Cinnamon menu.** Installed `usag8_0.1.0_amd64.deb` in the disposable Mint 22.3 live VM; Cinnamon search found the `usag8` entry and launching it rendered the dashboard with three example providers marked not connected and no usage values.
- [x] **Step 3: Validate fallback.** Launch offline and with no system tray/providers; check that UI still shows unavailable (not fabricated usage), Dark/Light, keyboard and window resize.
- [x] **Step 4: Uninstall.** `sudo apt remove <actual-package-name>`; verify app binary/menu entry removed and user data not silently deleted. Record exact installed package name from metadata.
- [x] **Step 5: Commit evidence.** `git add docs/release/deb-qa.md && git commit -m "test: record DEB install and removal smoke"`.

### Task 4: Branding and publishing decision

**Files:** Create `docs/release/branding-gate.md`; update `docs/release/deb-qa.md`.

**Interfaces:** Explicit disposition `INTERNAL-ONLY`, `APPROVED-PUBLIC` or `BLOCKED` plus trademark/domain/icon provenance status.

- [x] **Step 1: Review provisional identity.** Check name `usag8`, potential USAG conflict, desktop package ID, artwork rights. Do not assert legal clearance without evidence.
- [x] **Step 2: Record gate.** If any rights/identifier unknown choose `INTERNAL-ONLY`; note missing source approvals.
- [x] **Step 3: Review release evidence.** Cross-check all tests, package dependencies and supported distros. No auto-updater/network behavior without separate approval.
- [x] **Step 4: Commit.** `git add docs/release/branding-gate.md docs/release/deb-qa.md && git commit -m "docs: gate internal package publication"`.

**Exit gate:** A passing internal DEB is not an approved public release.
