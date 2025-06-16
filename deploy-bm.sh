#!/bin/bash -e
set -e

DEPLOYMENT=$1
PORT=22
SERVER=spinoza.brightblock.org
if [ "$DEPLOYMENT" == "testnet" ]; then
  SERVER=leibniz.brightblock.org
fi

BUILD_DIR=build
REMOTE_PATH=/var/www/stxeco

echo "Building app..."
npm run build

echo "Uploading build to $SERVER..."
rsync -aP -e "ssh -p $PORT" \
  static/ \
  build/ \
  package.json \
  bob@$SERVER:/var/www/stxeco

# Optionally restart PM2 or systemd service here:
# ssh -p $PORT bob@$SERVER "pm2 restart stxeco" || true
#		pm2 start index.js --name stxeco --cwd /var/www/stxeco --interpreter node --node-args="--enable-source-maps"

echo "✅ Deployment complete."

echo "Restarting app on server using PM2..."
ssh -p $PORT bob@$SERVER <<EOF
	source ~/.nvm/nvm.sh
	nvm use default
	cd /var/www/stxeco
	npm install --omit=dev --no-audit --no-fund
	PORT=3002
	if pm2 jlist | grep -q '"name":"stxeco"'; then
		pm2 restart stxeco
	else
		pm2 start /home/bob/pm2/ecosystem.config.js
	fi
EOF

echo "✅ Startup complete."
