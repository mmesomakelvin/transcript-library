#!/usr/bin/env bash
# =============================================================================
# Transcript Library — LXC Bootstrap Script
# =============================================================================
# Provisions an Ubuntu 24.04 LXC container with everything needed to run
# the Transcript Library. Run as root.
#
# Usage:
#   sudo bash setup-lxc.sh
# =============================================================================
set -euo pipefail

log() { printf '[setup-lxc] %s — %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }

# --- Pre-checks --------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" >&2
  exit 1
fi

# --- System updates ----------------------------------------------------------
log "Updating system packages..."
apt-get update -y
apt-get upgrade -y

# --- Install Node.js 22 via NodeSource ---------------------------------------
log "Installing Node.js 22..."
apt-get install -y ca-certificates curl gnupg
mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" \
  > /etc/apt/sources.list.d/nodesource.list
apt-get update -y
apt-get install -y nodejs

log "Node version: $(node --version)"
log "npm version: $(npm --version)"

# --- Install system dependencies --------------------------------------------
log "Installing git..."
apt-get install -y git

# --- Install pm2 globally ----------------------------------------------------
log "Installing pm2..."
npm install -g pm2

# --- Install cloudflared ------------------------------------------------------
log "Installing cloudflared..."
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg \
  | gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" \
  > /etc/apt/sources.list.d/cloudflared.list
apt-get update -y
apt-get install -y cloudflared

# --- Create deploy user -------------------------------------------------------
log "Creating deploy user..."
if ! id -u deploy >/dev/null 2>&1; then
  useradd --system --create-home --shell /bin/bash deploy
  log "User 'deploy' created"
else
  log "User 'deploy' already exists"
fi

# --- Create directory layout --------------------------------------------------
log "Creating directory layout..."

# Release directories (owned by deploy)
mkdir -p /opt/transcript-library/releases
chown -R deploy:deploy /opt/transcript-library

# Persistent runtime data (owned by deploy)
mkdir -p /srv/transcript-library/insights
mkdir -p /srv/transcript-library/logs
mkdir -p /srv/transcript-library/catalog
mkdir -p /srv/transcript-library/runtime
mkdir -p /srv/transcript-library/playlist-transcripts
chown -R deploy:deploy /srv/transcript-library

# --- Configure pm2 startup ---------------------------------------------------
log "Configuring pm2 startup for deploy user..."
env PATH="$PATH" pm2 startup systemd -u deploy --hp /home/deploy

# --- Install systemd units ---------------------------------------------------
log "Installing systemd units..."

# The systemd unit files are copied from the first deploy. For now, create
# the directory where they'll be installed.
mkdir -p /etc/systemd/system

log ""
log "============================================================"
log " LXC setup complete!"
log "============================================================"
log ""
log " Next steps:"
log "  1. Clone playlist-transcripts into /srv/transcript-library/playlist-transcripts"
log "  2. Create /srv/transcript-library/.env.local (see deploy/env.template)"
log "  3. Run the first deploy: sudo -u deploy bash deploy/deploy.sh"
log "  4. Configure cloudflared tunnel"
log "  5. Install systemd units from deploy/systemd/"
log "  6. Authenticate Claude CLI as the deploy user (if using claude-cli provider)"
log ""
