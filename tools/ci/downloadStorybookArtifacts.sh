#!/bin/bash

echo "--- Downloading artifacts"

buildkite-agent artifact download ".nx/*" . 

echo "--- Download complete"

