#!/usr/bin/env zx

try {
  await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js`;
  await $`vite build`;
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}
