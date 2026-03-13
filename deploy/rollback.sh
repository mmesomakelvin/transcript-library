#!/usr/bin/env bash
# =============================================================================
# Transcript Library — Rollback Script
# =============================================================================
# Repoints the current symlink to the previous release directory and restarts
# pm2. If there is no previous release, exits with an error.
#
# Usage:
#   ./rollback.sh
# =============================================================================
set -euo pipefail

readonly RELEASES_DIR="/opt/transcript-library/releases"
readonly CURRENT_LINK="/opt/transcript-library/current"
readonly PM2_APP_NAME="transcript-library"

# --- Helpers -----------------------------------------------------------------
log() { printf '[rollback] %s — %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }
die() { log "FATAL: $*"; exit 1; }

# --- Resolve current release -------------------------------------------------
if [[ -L "$CURRENT_LINK" ]]; then
  CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
  log "Current release: ${CURRENT_TARGET}"
else
  die "No current symlink at ${CURRENT_LINK}"
fi

# --- Find previous release ---------------------------------------------------
# List release dirs sorted newest-first, skip the current one, take the next
PREVIOUS_RELEASE=""
while IFS= read -r release_dir; do
  resolved="$(readlink -f "$release_dir")"
  if [[ "$resolved" != "$CURRENT_TARGET" ]]; then
    PREVIOUS_RELEASE="$resolved"
    break
  fi
done < <(ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null)

if [[ -z "$PREVIOUS_RELEASE" ]]; then
  die "No previous release found to roll back to"
fi

log "Rolling back to: ${PREVIOUS_RELEASE}"

# --- Repoint symlink ---------------------------------------------------------
ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK"
log "Symlink repointed: ${CURRENT_LINK} -> ${PREVIOUS_RELEASE}"

# --- Restart pm2 -------------------------------------------------------------
pm2 delete "$PM2_APP_NAME" 2>/dev/null || true
pm2 start "${CURRENT_LINK}/deploy/ecosystem.config.cjs"
pm2 save
log "pm2 restarted and saved"

# --- Report ------------------------------------------------------------------
if [[ -f "${PREVIOUS_RELEASE}/deploy-manifest.json" ]]; then
  log "Rolled back to manifest:"
  cat "${PREVIOUS_RELEASE}/deploy-manifest.json"
fi

log "Rollback complete"
