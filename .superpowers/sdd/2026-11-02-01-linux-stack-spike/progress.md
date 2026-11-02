# SDD ledger — plan: docs/superpowers/plans/2026-11-02-01-linux-stack-spike.md

Pre-flight: no shared interfaces; plan tasks are sequential runtime evidence checks, not producer-consumer code changes.

Task 1: Ruling: native runtime gate applies to native build and GUI validation — record missing WebKitGTK 4.1 plus xdo/AppIndicator/librsvg and leave native checks untested; frontend-only baseline steps remain independently runnable — cost if wrong: frontend checks run before system libraries are supplied.
Task 1: Ruling: repository had no parent commit — use the plan's first report commit as the branch root and avoid including unrelated initial files — cost if wrong: review history has no pre-task baseline commit.
Task 1: complete (root commit 6f9c047; tests: git diff --check → exit 0; no prior BASE existed)
Task 2: Ruling: source checkout is on vfat, which rejects npm's node_modules/.bin symlinks — dependency install, tests, build, and browser smoke ran in an ext4 temporary copy of the exact project sources; only package-lock.json was copied back — cost if wrong: environment-specific behavior of running directly from vfat remains unverified.
Task 2: complete (commits 6f9c047..be0bb19, tests: bash -c 'cd /tmp/usag8-plan01 && npm run check && npm test && npm run build' → ✓ built in 493ms)
Task 3: Ruling: Rust tests, Clippy, and native launch cannot pass without system dbus-1 development files (and the baseline already lacks WebKitGTK 4.1, xdo, AppIndicator, and librsvg) — recorded exact failed commands and left GUI matrix untested; no packages installed — cost if wrong: Tauri remains unvalidated until dependencies are installed and checks rerun.
Task 3: partial at initial attempt (commit 4c0a6fc records the missing `dbus-1` blocker); resumed after the user installed native packages.
Task 3→4: Ruling: proceed only with Task 4's deferred decision and reproducible measurement recipe — no actual performance measurements or stack acceptance without a native window — cost if wrong: decision remains deferred and downstream plans stay gated.
Task 4: complete (commits 4c0a6fc..14bd799, tests: git diff --check → (no output))
Task 3: complete (commits 99bf339..99bf339, tests: bash -c 'cd /tmp/usag8-plan01 && cargo test --manifest-path src-tauri/Cargo.toml && cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings' →     Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.19s)
Task 3: Ruling: user-installed development packages resolved the earlier native build blocker; `libxdo-dev` is installed but has no `xdo.pc`, and the app builds without that pkg-config module — cost if wrong: a future feature that directly links xdo may need a separate build check.
Task 3: evidence: Rust test 1/1 PASS, Clippy PASS, Mint Cinnamon/X11 Tauri window PASS, release DEB build PASS. Native GUI themes PASS; resize PARTIAL; keyboard and offline checks UNTESTED. The backend contract test and native UI both show three disconnected providers with unavailable usage.
Task 4: resumed measurements: release profile completed in 1m23s; DEB 2.80 MiB; three five-minute idle runs captured startup-window, process-tree CPU and RSS in docs/research/tauri-performance.md. Decision remains Deferred pending keyboard navigation and 1280×720 scrolling verification; GTK comparison is not applicable because no app-level blocker was found.
