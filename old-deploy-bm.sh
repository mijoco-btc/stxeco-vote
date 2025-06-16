#!/bin/bash -e
set -e;

DEPLOYMENT=$1
PORT=22

PATH_DEPLOY=build
mkdir -p $PATH_DEPLOY
SERVER=spinoza.brightblock.org
BUILDER=build
if [ "$DEPLOYMENT" == "testnet" ]; then
  SERVER=leibniz.brightblock.org;
fi

printf "\n-----------------------------------------------------------------------------------------------------\n";
printf "Running script: $0 \n";
printf "Deploying to: $SERVER \n";
printf "\n-----------------------------------------------------------------------------------------------------\n";

function __build() {
  npm run $BUILDER
  echo "Initialisation of $BUILD_PATH complete";
}

function __pushcode() {
  echo "\n- deploying from pipeline build \n";
  rsync -aP -e "ssh  -p $PORT" $PATH_DEPLOY/* static/* bob@$SERVER:/var/www/bigmarket
}

BUILD_PATH=./
__build

__pushcode

exit 0;
