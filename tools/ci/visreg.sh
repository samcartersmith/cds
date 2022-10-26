#!/bin/bash
set -euo

# This script handles the core logic associated with react native builds in CI.
# We leverage the mobile cli in order to reuse the same native build for all Visreg test steps.
# Mobile cli docs: https://frontend.cbhq.net/mobile/mobile-cli/what-is-mobile-cli

# Paths
REPOSITORY_ROOT=$(git rev-parse --show-toplevel)
RN_DOWNLOAD_PATH=apps/mobile-playground
ARTIFACT_PATH=$RN_DOWNLOAD_PATH/artifacts # This must be declared as an artifact path in the prebuild step
RN_PATH=$REPOSITORY_ROOT/$RN_DOWNLOAD_PATH

# Filenames
IOS_TAR_NAME=App.tar.gz
ANDROID_TAR_NAME=cds-playground-android-app.tar.gz
APK_NAME=app-functionalTestRelease.apk
TEST_APK_NAME=app-functionalTestRelease-androidTest.apk

# Set up is needed for all code paths
tools/ci/setup.sh

# $1 = platform
if [[ "$1" == "ios" ]]; then
    # $2 = build | test
    if [[ "$2" == "build" ]]; then
        echo "--- Setting up for iOS Prebuild"
        AWS_ACCESS_KEY_ID=$(sed -n -e 's/^.*aws_access_key_id = //p' /Users/ci/.aws/credentials)
        export AWS_ACCESS_KEY_ID
        AWS_SECRET_ACCESS_KEY=$(sed -n -e 's/^.*aws_secret_access_key = //p' /Users/ci/.aws/credentials)
        export AWS_SECRET_ACCESS_KEY

        echo "--- Create and upload iOS Prebuild"
        mkdir -p $ARTIFACT_PATH
        yarn nx run mobile-playground:prebuild-ios-e2e --destination $(pwd)/$ARTIFACT_PATH/$IOS_TAR_NAME

    else

        echo "--- Downloading iOS prebuild"
        mkdir -p /tmp/$BUILDKITE_JOB_ID
        buildkite-agent artifact download $ARTIFACT_PATH/$IOS_TAR_NAME /tmp/$BUILDKITE_JOB_ID/.
        mkdir -p $RN_PATH/ios/build/Build/Products/Release-iphonesimulator

        echo "--- Extracting prebuild"
        tar -xzf /tmp/$BUILDKITE_JOB_ID/$ARTIFACT_PATH/$IOS_TAR_NAME --directory $RN_PATH/ios/build/Build/Products/Release-iphonesimulator
        echo "Prebuild extracted."

        echo "--- Setup for Tests"
        . tools/ci/visreg-setup-parallel.sh

        echo "--- Running Visreg Tests"
        yarn nx run mobile-playground:ios-e2e
    fi
else
    # $2 = build | test
    if [[ "$2" == "build" ]]; then
        export SYSTEM_VERSION_COMPAT=0

        echo "--- Create and upload Android Prebuild"
        mkdir -p $ARTIFACT_PATH
        yarn nx run mobile-playground:prebuild-android-e2e --destination $(pwd)/$ARTIFACT_PATH/$ANDROID_TAR_NAME
    else

        echo "--- Downloading Android prebuild"
        mkdir -p /tmp/$BUILDKITE_JOB_ID
        buildkite-agent artifact download $ARTIFACT_PATH/$ANDROID_TAR_NAME /tmp/$BUILDKITE_JOB_ID/.

        echo "--- Extracting prebuild"
        echo "Untar patched apk and test apk..."
        tar -xzf /tmp/$BUILDKITE_JOB_ID/$ARTIFACT_PATH/$ANDROID_TAR_NAME --directory $REPOSITORY_ROOT

        mkdir -p $RN_PATH/android/app/build/outputs/apk/functionalTestRelease
        mkdir -p $RN_PATH/android/app/build/outputs/apk/androidTest/functionalTestRelease
        mv $REPOSITORY_ROOT/$APK_NAME $RN_PATH/android/app/build/outputs/apk/functionalTestRelease/$APK_NAME
        mv $REPOSITORY_ROOT/$TEST_APK_NAME $RN_PATH/android/app/build/outputs/apk/androidTest/functionalTestRelease/$TEST_APK_NAME
        echo "Prebuild extracted."

        echo "Creating repositories.cfg"
        mkdir -p /root/.android && touch /root/.android/repositories.cfg

        echo "--- Starting adb server"
        adb start-server

        echo "--- Running Android E2E tests"
        . tools/ci/visreg-setup-parallel.sh
        yarn nx run mobile-playground:android-e2e-emulator
        yarn nx run mobile-playground:android-e2e

    fi

fi
