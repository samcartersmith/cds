#!/bin/bash
yarn website setup
yarn workspace @cbhq/cds-tools build
yarn workspace @cbhq/cds-web-utils build
yarn nx run ui-mobile-a11y-engine:build
yarn nx run ui-mobile-playground:build
cd examples/nextjs
yarn install
cd ../..
