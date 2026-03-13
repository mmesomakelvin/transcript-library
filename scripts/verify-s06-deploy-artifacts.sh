#!/usr/bin/env bash
# =============================================================================
# S06 Slice Verification — Deploy Artifact Consistency
# =============================================================================
# Validates that all deploy artifacts exist, are internally consistent,
# pass static analysis, and cover the required env vars.
#
# Usage:
#   bash scripts/verify-s06-deploy-artifacts.sh
#
# Exit codes:
#   0 = all checks pass
#   1 = one or more checks failed
# =============================================================================
set -euo pipefail

FAIL=0
PASS=0

pass() { printf '  ✓ %s\n' "$1"; PASS=$((PASS + 1)); }
fail() { printf '  ✗ %s\n' "$1"; FAIL=$((FAIL + 1)); }

# ---- Check 1: All deploy artifacts exist ------------------------------------
echo "=== Artifact existence ==="

REQUIRED_FILES=(
  deploy/deploy.sh
  deploy/rollback.sh
  deploy/setup-lxc.sh
  deploy/ecosystem.config.cjs
  deploy/env.template
  deploy/cloudflared-config.yml
  deploy/deploy-hook.ts
  deploy/systemd/deploy-hook.service
  deploy/systemd/transcript-library-sweep.service
  deploy/systemd/transcript-library-sweep.timer
)

for f in "${REQUIRED_FILES[@]}"; do
  if [[ -f "$f" ]]; then
    pass "$f exists"
  else
    fail "$f is missing"
  fi
done

# ---- Check 2: Shellcheck on shell scripts ----------------------------------
echo ""
echo "=== Shellcheck ==="

SHELL_SCRIPTS=(
  deploy/deploy.sh
  deploy/rollback.sh
  deploy/setup-lxc.sh
)

for script in "${SHELL_SCRIPTS[@]}"; do
  if [[ -f "$script" ]]; then
    if shellcheck "$script" >/dev/null 2>&1; then
      pass "shellcheck $script"
    else
      fail "shellcheck $script"
      shellcheck "$script" 2>&1 | head -20
    fi
  fi
done

# ---- Check 3: Path consistency ---------------------------------------------
echo ""
echo "=== Path consistency ==="

# All deploy artifacts should use /opt/transcript-library/ for releases/current
# and /srv/transcript-library/ for mutable data. No mixing.
OPT_PATH="/opt/transcript-library/"
SRV_PATH="/srv/transcript-library/"

# Files that reference deployment paths
PATH_FILES=(
  deploy/deploy.sh
  deploy/rollback.sh
  deploy/ecosystem.config.cjs
  deploy/env.template
  deploy/systemd/deploy-hook.service
  deploy/systemd/transcript-library-sweep.service
)

for f in "${PATH_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then continue; fi

  # Check that files referencing release paths use /opt/transcript-library/
  if grep -q "releases\|current" "$f" 2>/dev/null; then
    if grep -q "$OPT_PATH" "$f" 2>/dev/null; then
      pass "$f uses $OPT_PATH for release paths"
    else
      fail "$f references releases/current but not under $OPT_PATH"
    fi
  fi
done

# Verify no file uses a wrong base path for releases
for f in "${PATH_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then continue; fi
  # /srv/ should never have releases/ or current
  if grep -q "${SRV_PATH}releases\|${SRV_PATH}current" "$f" 2>/dev/null; then
    fail "$f incorrectly puts releases/current under $SRV_PATH"
  else
    pass "$f does not misplace releases under $SRV_PATH"
  fi
done

# ---- Check 4: Env template vs hosted-config.ts coverage --------------------
echo ""
echo "=== Env var coverage ==="

HOSTED_CONFIG="src/lib/hosted-config.ts"
ENV_TEMPLATE="deploy/env.template"

if [[ -f "$HOSTED_CONFIG" && -f "$ENV_TEMPLATE" ]]; then
  # Extract env var names referenced in hosted-config.ts via process.env.XXX
  HOSTED_VARS=$(grep -oE 'process\.env\.[A-Z_][A-Z_0-9]*' "$HOSTED_CONFIG" | sed 's/process\.env\.//' | sort -u)

  MISSING_VARS=()
  for var in $HOSTED_VARS; do
    # Skip internal vars like NODE_ENV, GIT_TERMINAL_PROMPT
    case "$var" in
      NODE_ENV|GIT_TERMINAL_PROMPT) continue ;;
    esac
    if ! grep -q "^${var}=" "$ENV_TEMPLATE" && ! grep -q "^# ${var}=" "$ENV_TEMPLATE"; then
      MISSING_VARS+=("$var")
    fi
  done

  if [[ ${#MISSING_VARS[@]} -eq 0 ]]; then
    pass "env.template covers all vars from hosted-config.ts"
  else
    fail "env.template is missing vars: ${MISSING_VARS[*]}"
  fi
else
  fail "Cannot check env coverage — hosted-config.ts or env.template not found"
fi

# ---- Check 5: Systemd units reference correct paths and user ---------------
echo ""
echo "=== Systemd unit validation ==="

SYSTEMD_DIR="deploy/systemd"

for unit in "$SYSTEMD_DIR"/*.service; do
  if [[ ! -f "$unit" ]]; then continue; fi
  basename_unit="$(basename "$unit")"

  # Check User=deploy
  if grep -q "^User=deploy" "$unit"; then
    pass "$basename_unit runs as User=deploy"
  else
    fail "$basename_unit does not specify User=deploy"
  fi

  # Check WorkingDirectory points to /opt/transcript-library/current
  if grep -q "WorkingDirectory=/opt/transcript-library/current" "$unit"; then
    pass "$basename_unit WorkingDirectory is /opt/transcript-library/current"
  else
    # The sweep service may not have WorkingDirectory — check if it needs one
    if grep -q "WorkingDirectory=" "$unit"; then
      fail "$basename_unit WorkingDirectory is not /opt/transcript-library/current"
    else
      fail "$basename_unit missing WorkingDirectory"
    fi
  fi
done

# ---- Check 6: ecosystem.config.cjs cwd matches deployment plan -------------
echo ""
echo "=== Ecosystem config validation ==="

ECOSYSTEM="deploy/ecosystem.config.cjs"

if [[ -f "$ECOSYSTEM" ]]; then
  if grep -q 'cwd: "/opt/transcript-library/current"' "$ECOSYSTEM"; then
    pass "ecosystem.config.cjs cwd matches deployment plan"
  else
    fail "ecosystem.config.cjs cwd does not match /opt/transcript-library/current"
  fi
else
  fail "ecosystem.config.cjs not found"
fi

# ---- Summary ----------------------------------------------------------------
echo ""
echo "=== Summary ==="
echo "  Passed: $PASS"
echo "  Failed: $FAIL"

if [[ $FAIL -gt 0 ]]; then
  echo ""
  echo "RESULT: FAIL"
  exit 1
else
  echo ""
  echo "RESULT: PASS"
  exit 0
fi
