#!/usr/bin/env bash
# Arrête le serveur Next.js démarré par start.sh (parent + enfants).
set -euo pipefail

PID_FILE=/tmp/next.pid

if [[ -f "$PID_FILE" ]]; then
  PID="$(cat "$PID_FILE")"
  # Tue tout l'arbre de process (pnpm → next → next-server)
  pkill -P "$PID" 2>/dev/null || true
  kill "$PID" 2>/dev/null || true
  sleep 1
  kill -9 "$PID" 2>/dev/null || true
  rm -f "$PID_FILE"
fi

# Filet de sécurité : nettoie d'éventuels orphelins
pkill -f "next-server" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true
pkill -f "pnpm start" 2>/dev/null || true

echo "Next.js arrêté."
