#!/bin/bash
set -euo pipefail

echo "--- Setup job"
# run the shell script preceded by "." (dot space).
# This causes the script to run the instructions in the original shell. Thus the env variables still exist in the next script
. tools/ci/visreg-setup.sh

echo "--- Building iOS"

yarn nx run mobile-playground:build-ios-e2e | xcpretty

echo "--- Running iOS e2e tests"
yarn nx run mobile-playground:ios-e2e