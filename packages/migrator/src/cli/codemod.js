#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

function printUsage() {
  console.log(`\nUsage: cds-migrator-codemod <transform> <paths...> [-- <jscodeshift options>]

Examples:
  npx cds-migrator-codemod update-8-0-0 src
  npx cds-migrator-codemod update-8-0-0 src -- --dry
`);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  printUsage();
  process.exit(1);
}

const [transformName, ...rest] = args;
const extraIdx = rest.indexOf('--');
let paths, extraOptions;
if (extraIdx !== -1) {
  paths = rest.slice(0, extraIdx);
  extraOptions = rest.slice(extraIdx + 1);
} else {
  paths = rest;
  extraOptions = [];
}

const transformPath = path.join(
  __dirname,
  '..',
  'migrations',
  `${transformName}-jscodeshift`,
  'index.js',
);

const jscodeshiftArgs = [
  '-t',
  transformPath,
  '--parser=tsx',
  '--extensions=ts,tsx,js,mjs,cjs',
  `--printOptions=${JSON.stringify({ reuseWhitespace: true })}`,
  ...paths,
  ...extraOptions,
];

console.log('Running jscodeshift with args:', jscodeshiftArgs);

const result = spawnSync('npx', ['jscodeshift', ...jscodeshiftArgs], { stdio: 'inherit' });

process.exit(result.status);
