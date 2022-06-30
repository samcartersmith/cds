#!/bin/bash
yarn website setup
yarn workspace @cbhq/cds-tools build
yarn workspace @cbhq/cds-web-utils build
cd examples/nextjs
yarn install
cd ../..
