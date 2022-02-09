#!/bin/bash

babel ./tools/executors/build-package/impl.ts --config-file ./babel.build.config.js --extensions .ts --out-dir ./tools/executors/build-package/
nx run web-utils:build-package