#!/bin/bash

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Immutable is the same as a frozen lockfile
yarn install --immutable

# Need to make sure base branch is up-to-date. If not running on a PR, use `master`.
BASE_BRANCH=$BUILDKITE_PULL_REQUEST_BASE_BRANCH

if [[ -z "$BASE_BRANCH" ]]; then
    BASE_BRANCH=$OVERRIDE_BUILDKITE_PULL_REQUEST_BASE_BRANCH
fi

if [[ -z "$BASE_BRANCH" ]]; then
    BASE_BRANCH=$BUILDKITE_BRANCH
fi

if [[ -z "$BASE_BRANCH" ]]; then
    BASE_BRANCH="master"
fi

echo "--- Updating local '$BASE_BRANCH' base branch"

# Required for correct NX affected project resolution
git fetch -f --no-tags origin $BASE_BRANCH:$BASE_BRANCH

echo "--- Setup complete, running jobs"
