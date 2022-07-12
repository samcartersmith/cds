#!/bin/bash

mkdir -p percy-artifacts
randomNonce=percyNonce_$(openssl rand -base64 21)

echo $randomNonce
echo "$randomNonce" > "percy-artifacts/$PERCY_NONCE_FILE_NAME"

# If we do not exit and nonce is succesfully created; we run iOS and Android tests
buildkite-agent pipeline upload .buildkite/percy-ios.yml
buildkite-agent pipeline upload .buildkite/percy-android.yml
