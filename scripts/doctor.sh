#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' '=== Usag8 / Linux environment diagnostic ==='
printf 'Desktop: %s\n' "${XDG_CURRENT_DESKTOP:-unknown}"
printf 'Session: %s\n' "${XDG_SESSION_TYPE:-unknown}"
printf 'Distribution: '; . /etc/os-release && echo "$PRETTY_NAME"
for bin in git node npm cargo rustc pkg-config; do
  if command -v "$bin" >/dev/null 2>&1; then printf 'OK: %s (%s)\n' "$bin" "$(command -v "$bin")";
  else printf 'MISSING: %s\n' "$bin"; fi
done
if command -v pkg-config >/dev/null 2>&1; then
  for dep in webkit2gtk-4.1 openssl; do
    if pkg-config --exists "$dep"; then echo "OK: $dep $(pkg-config --modversion "$dep")";
    else echo "MISSING PKG-CONFIG: $dep"; fi
  done
fi
printf '\nDoes not install packages or read assistant credentials.\n'
