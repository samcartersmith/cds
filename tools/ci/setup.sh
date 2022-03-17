#!/bin/bash

echo "--- Updating local 'master' branch"

# Required for correct NX affected project resolution
git fetch -f --no-tags origin master:master

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Immutable is the same as a frozen lockfile
yarn install --immutable

echo "--- Setup complete, running jobs"
