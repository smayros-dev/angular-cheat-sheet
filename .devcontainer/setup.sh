#!/usr/bin/env bash
# One-time setup for the dev container: the Node majors each workspace
# needs, a Chrome binary for Karma, and every workspace's dependencies.
set -euo pipefail

# shellcheck source=/dev/null
source "${NVM_DIR:-/usr/local/share/nvm}/nvm.sh"

for major in 16 18 20; do
  nvm install "$major" >/dev/null
done
nvm alias default 20 >/dev/null

if ! command -v google-chrome >/dev/null 2>&1; then
  echo "Installing Google Chrome for Karma…"
  wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  sudo apt-get update -qq
  sudo apt-get install -y -qq /tmp/chrome.deb >/dev/null
  rm -f /tmp/chrome.deb
fi

for pair in ng14:16 ng16:18 ng18:20; do
  workspace=${pair%%:*}
  major=${pair#*:}
  echo "Installing $workspace with Node $major…"
  (cd "$workspace" && nvm exec "$major" npm ci --no-audit --no-fund --loglevel=error)
done

echo "Ready. Run the tests with: node tools/run.mjs test ng16"
