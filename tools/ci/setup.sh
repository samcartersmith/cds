#!/bin/bash

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Immutable is the same as a frozen lockfile
yarn install --immutable

# Need to make sure base branch is up-to-date. If not running on a PR, use `master`.
BASE_BRANCH=$BUILDKITE_PULL_REQUEST_BASE_BRANCH
if [[ -z "$BASE_BRANCH" ]]; then
    BASE_BRANCH="master"
fi

# Temporarary workaround for null coalescing issue on an empty string here https://github.cbhq.net/frontend/web/blob/master/packages/mono-pipeline/src/helpers.ts#L30
BUILDKITE_PULL_REQUEST_BASE_BRANCH=$BASE_BRANCH

echo "--- Updating local '$BASE_BRANCH' base branch from buildkite branch '$BUILDKITE_PULL_REQUEST_BASE_BRANCH'"

# Required for correct NX affected project resolution
git fetch -f --no-tags origin $BASE_BRANCH:$BASE_BRANCH

echo "--- Setup complete, running jobs"
