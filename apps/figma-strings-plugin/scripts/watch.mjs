#!/usr/bin/env zx
import { $, within } from 'zx';

$.verbose = true;

try {
  within(async () => {
    await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js --watch`;
  });
  await $`vite build --watch -m development`;
} catch (err) {
  console.error(err);
  process.exit(1);
}
