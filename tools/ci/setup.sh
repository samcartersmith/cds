#!/bin/bash

echo "--- Installing yarn dependencies"

# Disable global cache so that we can cache `.yarn/cache` in buildkite
yarn config set enableGlobalCache false

# Immutable is the same as a frozen lockfile
yarn install --immutable

echo "--- Building required packages"

yarn setup

echo "--- Setup complete, running jobs"
