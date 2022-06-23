#!/bin/bash
yarn workspace @cbhq/docusaurus-plugin-docgen build
yarn workspace @cbhq/docusaurus-plugin-kbar build
yarn workspace @cbhq/docusaurus-preset build
yarn workspace @cbhq/docusaurus-theme build
yarn workspace @cbhq/cds-tools build
yarn workspace @cbhq/cds-web-utils build
cd examples/nextjs
yarn install
cd ../..
