#!/bin/bash
set -euo pipefail

echo "--- Setup job"
# run your shell script preceded by "." (dot space).
# This causes the script to run the instructions in the original shell. Thus the env variables still exist in the next script
. tools/ci/visreg-setup.sh

ARTIFACT_PATH=$1
APP_PATH="apps/mobile-playground"


echo "--- Downloading prebuild"
mkdir -p /tmp/$BUILDKITE_JOB_ID
buildkite-agent artifact download $ARTIFACT_PATH /tmp/$BUILDKITE_JOB_ID/.


echo "--- Setting up test environment"
echo "Untar patched apk and test apk..."
tar -xzf /tmp/$BUILDKITE_JOB_ID/$ARTIFACT_PATH --directory /workdir
mkdir -p $APP_PATH/android/app/build/outputs/apk/functionalTestRelease
mkdir -p $APP_PATH/android/app/build/outputs/apk/androidTest/functionalTestRelease

# Note that we are using the x86_64 build and pretending it is the universal one
mv /workdir/app-functionalTestRelease.apk $APP_PATH/android/app/build/outputs/apk/functionalTestRelease/app-functionalTestRelease.apk
mv /workdir/app-functionalTestRelease-androidTest.apk $APP_PATH/android/app/build/outputs/apk/androidTest/functionalTestRelease/app-functionalTestRelease-androidTest.apk

echo "Creating repositories.cfg"
mkdir -p /root/.android && touch /root/.android/repositories.cfg

echo "--- Starting adb server"
adb start-server

echo "--- Running Android E2E tests"
yarn nx run mobile-playground:android-e2e-emulator
yarn nx run mobile-playground:android-e2e