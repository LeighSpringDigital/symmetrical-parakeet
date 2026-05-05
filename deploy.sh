#!/bin/bash
set -e
cd /mnt/c/Users/leigh/Old-Tigers-Head
git pull origin main
rsync -a --delete artifacts/oth-website/src/ /tmp/oth-isolated/src/
rsync -a artifacts/oth-website/public/ /tmp/oth-isolated/public/
cd /tmp/oth-isolated
PATH="$HOME/.nvm/versions/node/v22.22.2/bin:$PATH" node_modules/.bin/opennextjs-cloudflare build
echo "" > .open-next/assets/_redirects
PATH="$HOME/.nvm/versions/node/v22.22.2/bin:$PATH" node_modules/.bin/wrangler deploy
echo ""
echo "Deploy complete."
