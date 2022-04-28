#!/bin/bash
yarn workspace @cbhq/docusaurus-plugin-docgen build
yarn run babel ./tools/executors --config-file ./babel.build.config.js --extensions .ts --out-dir ./tools/executors
cd packages/web-utils
../../node_modules/.bin/babel ./ --config-file ../../babel.build.config.js --extensions .ts,.tsx --ignore "**/*.js","**/*.test.ts","**/*.test.tsx","node_modules/**","dist/**" --out-dir ./dist --copy-files --no-copy-ignored
rm -rf dist/node_modules
rm -rf dist/dist
../../node_modules/.bin/tsc --project ./tsconfig.build.json
cd ../..
cd examples/nextjs
yarn install
cd ../..