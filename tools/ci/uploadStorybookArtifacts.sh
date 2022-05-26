#!/bin/bash

echo "--- Uploading artifacts"

buildkite-agent artifact upload ".nx/outs/projects/apps/storybook/**/*"

echo "--- Upload complete"

