#!/bin/bash

babel ./tools/executors --config-file ./babel.build.config.js --extensions .ts --out-dir ./tools/executors
nx run web-utils:build-package