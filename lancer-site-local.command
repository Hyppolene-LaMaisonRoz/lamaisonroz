#!/bin/zsh
# Lance le site La Maison Roz en local et l'ouvre dans le navigateur.
# Double-clic dans le Finder pour l'utiliser. Ctrl+C (ou fermer la fenêtre) pour arrêter.
# Versionné dans git mais non publié sur le site (voir exclude dans _config.yml).

cd "$(dirname "$0")" || exit 1
PORT=8000
URL="http://localhost:$PORT"

est_notre_site() {
  curl -s --max-time 2 "$URL/" | grep -q "La Maison Roz"
}

# Serveur déjà lancé : on ouvre simplement le navigateur.
if est_notre_site; then
  echo "Serveur déjà actif → $URL"
  open "$URL"
  exit 0
fi

# Port occupé par autre chose : on en cherche un libre.
while lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  URL="http://localhost:$PORT"
done

# Ouvre le navigateur dès que le serveur répond.
(
  for i in {1..50}; do
    est_notre_site && { open "$URL"; exit 0; }
    sleep 0.2
  done
  echo "Le serveur ne répond pas."
) &

echo "Site local → $URL   (Ctrl+C pour arrêter)"
# Relance automatique si le serveur s'arrête de lui-même.
trap 'echo "\nServeur arrêté."; exit 0' INT TERM
while true; do
  python3 -m http.server "$PORT" --bind 127.0.0.1
  echo "Serveur interrompu, relance dans 1 s…"
  sleep 1
done
