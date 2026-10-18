#!/usr/bin/env bash
# Smoke test for the dev container: reference specs of every workspace must
# pass, and `npm run start:web` must answer requests that arrive through a
# Codespaces forwarded URL (Host: <name>-4200.app.github.dev).
set -uo pipefail

# shellcheck source=/dev/null
source "${NVM_DIR:-/usr/local/share/nvm}/nvm.sh"
status=0

for pair in ng14:16 ng16:18 ng18:20; do
  workspace=${pair%%:*}
  major=${pair#*:}
  echo "::group::$workspace reference specs (Node $major)"
  (cd "$workspace" && nvm exec "$major" npx ng test --watch=false --browsers=ChromeHeadlessCI \
    --include='src/app/app.component.spec.ts' --include='src/app/taskboard/**/*.spec.ts') || status=1
  echo "::endgroup::"

  echo "::group::$workspace start:web behind a Codespaces host"
  (cd "$workspace" && nvm exec "$major" npm run start:web > "/tmp/serve-$workspace.log" 2>&1 &)
  for _ in $(seq 1 120); do curl -s -o /dev/null localhost:4200 && break; sleep 2; done
  code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: demo-4200.app.github.dev' localhost:4200)
  echo "$workspace: HTTP $code"
  [ "$code" = "200" ] || { status=1; tail -20 "/tmp/serve-$workspace.log"; }
  pkill -f 'ng serve' || true
  sleep 3
  echo "::endgroup::"
done

exit $status
