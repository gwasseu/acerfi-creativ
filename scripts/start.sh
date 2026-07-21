#!/usr/bin/env bash
# Lance Next.js en mode production sur le port 3000.
# Build avec `pnpm build` au préalable.
# Logs : /tmp/next.log · PID : /tmp/next.pid
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG=/tmp/next.log
PID_FILE=/tmp/next.pid

if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Next.js déjà en cours (PID $(cat "$PID_FILE"))."
  exit 0
fi

cd "$APP_DIR"
nohup pnpm start --port 3000 --hostname 0.0.0.0 > "$LOG" 2>&1 &
echo $! > "$PID_FILE"
echo "Next.js démarré (PID $(cat "$PID_FILE")). Logs: $LOG"
