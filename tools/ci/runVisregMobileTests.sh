#!/bin/bash

mkdir -p percy-artifacts
randomNonce=percyNonce_$(openssl rand -base64 21)

echo $randomNonce
echo "$randomNonce" > "percy-artifacts/$PERCY_NONCE_FILE_NAME"

# If we do not exit and nonce is successfully created, we run iOS and Android visreg tests
buildkite-agent pipeline upload .buildkite/visreg-ios.yml
buildkite-agent pipeline upload .buildkite/visreg-android.yml
