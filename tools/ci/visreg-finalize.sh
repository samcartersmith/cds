#!/bin/bash
set -euo pipefail

# TODO: replace this just install of percy cli. We are downloading a lot more than we need
tools/ci/setup.sh

cd apps/mobile-playground

$(yarn bin percy) build:finalize