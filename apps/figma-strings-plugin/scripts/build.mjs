#!/usr/bin/env zx
import { $ } from 'zx';

$.verbose = true;

try {
  await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js`;
  await $`vite build -m production`;
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}
