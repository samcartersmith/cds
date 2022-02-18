#!/bin/bash

export PATH=$PATH:$(pwd)/node_modules/.bin
babel ./tools/executors --config-file ./babel.build.config.js --extensions .ts --out-dir ./tools/executors
nx run web-utils:build