#!/bin/bash
set -euo pipefail

# https://buildkite.com/docs/tutorials/parallel-builds
# BUILDKITE_PARALLEL_JOB starts at zero based index and VISREG_JOB_NUMBER expects 1 based index

export VISREG_JOB_NUMBER=$(($BUILDKITE_PARALLEL_JOB+1))
echo "--- VISREG_JOB_NUMBER = $VISREG_JOB_NUMBER"

export VISREG_TOTAL_JOBS=$BUILDKITE_PARALLEL_JOB_COUNT
echo "--- VISREG_TOTAL_JOBS = $VISREG_TOTAL_JOBS"

envVars="
BUILDKITE=$BUILDKITE
BUILDKITE_COMMIT=$BUILDKITE_COMMIT
BUILDKITE_BRANCH=$BUILDKITE_BRANCH
BUILDKITE_PULL_REQUEST=$BUILDKITE_PULL_REQUEST
BUILDKITE_BUILD_ID=$BUILDKITE_BUILD_ID
BUILDKITE_PARALLEL_JOB_COUNT=$BUILDKITE_PARALLEL_JOB_COUNT
BUILDKITE_PARALLEL_JOB=$BUILDKITE_PARALLEL_JOB
VISREG_JOB_NUMBER=$VISREG_JOB_NUMBER
VISREG_TOTAL_JOBS=$VISREG_TOTAL_JOBS
"

echo "$envVars"

# TODO: First line can be removed if macos-metal agents get upgraded
# https://docs.google.com/document/d/1bN53rawPd_A6WjZIAAwG_r_uSy7APaxz3pNz3aqIB-k/edit?usp=sharing
nvm install 16.16.0 && nvm use 16.16.0 && npm install -g yarn

tools/ci/setup.sh