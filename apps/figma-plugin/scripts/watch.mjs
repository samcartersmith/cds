#!/usr/bin/env zx

try {
  within(async () => {
    await $`esbuild ./src/plugin.ts --bundle --outfile=dist/plugin.js --watch`;
  });
  await $`vite build --watch`;
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}
