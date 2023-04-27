const chalk = require('chalk');
const { exec } = require('./helpers/exec');

// check for forbidden file suffixes
const FILES_REGEX = { mdx: /\.stories.mdx$/ };

// this filters out deleted files (lower case d means exclude deleted files)
const stagedFiles = exec('git diff --staged --diff-filter=d --name-only').split('\n');
let status = 0;

for (let [suffix, regex] of Object.entries(FILES_REGEX)) {
  const files = stagedFiles.filter((file) => regex.test(file));
  if (files.length) {
    console.log(
      chalk.bgRed.black.bold(`${suffix.toUpperCase()} files are not allowed in this repo: `),
      chalk.bgBlack.red.bold(files.join(', ')),
    );
    status = 1;
  }
}

process.exit(status);
