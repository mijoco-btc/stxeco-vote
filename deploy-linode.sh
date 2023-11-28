#!/bin/bash -e
set -e;

export DEPLOYMENT=$1
export PORT=7019

PATH_DEPLOY=build
mkdir -p $PATH_DEPLOY
export SERVER=chomsky.brightblock.org
export BUILDER=build
if [ "$DEPLOYMENT" == "stag" ]; then
  SERVER=popper.brightblock.org;
  BUILDER=build-linode
  PORT=22
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
  rsync -aP -e "ssh  -p $PORT" $PATH_DEPLOY/* static/* bob@$SERVER:/var/www/sbtc-bridge
}

BUILD_PATH=./
__build

__pushcode

exit 0;
