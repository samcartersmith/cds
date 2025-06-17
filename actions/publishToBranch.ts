#!/usr/bin/env -S node -r ts-node/register/transpile-only

// Publish actions from HEAD to a branch

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'readline';
import yargs from 'yargs/yargs';

// TODO: Figure out this TSissue
// Ideally we want to import from @cbhq/script-utils
import { git } from '../libs/script-utils/src/actions/git';
import { run } from '../libs/script-utils/src/actions/run';

const rl = createInterface(process.stdin, process.stdout);

const REPO_ROOT = git.repoRoot();
const ACTIONS_FOLDER = 'actions';
const JS_DIST_FOLDER = 'dist';
const ASSETS_FOLDER = 'assets';
const WORKFLOW_FOLDER = '.github/workflows';
const JS_ACTION_FILES = [JS_DIST_FOLDER, 'action.yml', 'README.md'];

async function main() {
  if (REPO_ROOT) process.chdir(REPO_ROOT);
  const args = await yargs(process.argv.slice(2))
    .option('branch', {
      description: "The branch to publish to (usually something like 'v3', 'next', or 'latest')",
      type: 'string',
      required: true,
    })
    .option('allow-dirty', {
      description: 'Allows publishing even if the working directory is dirty. Use with caution!',
      type: 'boolean',
      required: false,
    })
    .option('yes', {
      alias: 'y',
      description: 'Do not prompt for confirmation. Use with caution!',
      type: 'boolean',
      required: false,
    })
    .strict()
    .help().argv;

  if (!args.allowDirty && git.isDirty()) {
    throw new Error(
      'Working directory is dirty. Please commit or stash your changes before publishing',
    );
  }
  const actions = fs
    .readdirSync(ACTIONS_FOLDER, { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((f) => f.name);
  const workflows = fs
    .readdirSync(WORKFLOW_FOLDER, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.yml'))
    .map((f) => f.name);
  console.log(`Publishing actions and workflows to branch ${args.branch}`);
  console.log('Building');
  // Safety check to make sure dist folders are clean
  run(`git clean -fde '!${JS_DIST_FOLDER}'`);
  run('yarn build-actions');

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'publish-'));
  console.log(`Created temp working directory: ${tmp}`);
  fs.cpSync('.git', path.join(tmp, '.git'), { recursive: true });
  process.chdir(tmp);
  const branchExists = !run(
    `git fetch origin ${args.branch} || echo "BRANCH DOES NOT EXIST"`,
    'pipe',
  ).includes('BRANCH DOES NOT EXIST');
  if (branchExists) {
    console.log(`Branch exists. Checking out: ${args.branch}`);
    run(`git fetch origin ${args.branch}`);
    run(`git checkout FETCH_HEAD`);
  } else {
    console.log(`Creating new branch: ${args.branch}`);
    run(`git checkout --orphan ${args.branch}`);
  }
  run(`git rm -r .`);

  if (REPO_ROOT) process.chdir(REPO_ROOT);
  fs.cpSync(path.join(ACTIONS_FOLDER, 'README.md'), path.join(tmp, 'README.md'));
  console.log('\nActions to publish:');
  actions.forEach((action) => {
    // Javascript Action
    if (fs.existsSync(path.join(ACTIONS_FOLDER, action, 'package.json'))) {
      console.log(`  * ${action} - JS Action`);
      fs.mkdirSync(path.join(tmp, action));
      JS_ACTION_FILES.forEach((file) => {
        fs.cpSync(path.join(ACTIONS_FOLDER, action, file), path.join(tmp, action, file), {
          recursive: true,
        });
      });
    } else {
      console.log(`  * ${action} - Non-JS Action`);
      // For Non JS actions, we copy everything
      fs.cpSync(path.join(ACTIONS_FOLDER, action), path.join(tmp, action), {
        recursive: true,
      });
    }
    // Assets
    if (fs.existsSync(path.join(ACTIONS_FOLDER, action, ASSETS_FOLDER))) {
      fs.cpSync(
        path.join(ACTIONS_FOLDER, action, ASSETS_FOLDER),
        path.join(tmp, action, ASSETS_FOLDER),
        { recursive: true },
      );
    }
  });
  workflows.forEach((workflow) => {
    fs.cpSync(
      path.join(WORKFLOW_FOLDER, workflow),
      path.join(path.join(tmp, WORKFLOW_FOLDER), workflow),
      {
        recursive: true,
      },
    );
  });
  const fromRef = run('git rev-parse HEAD', 'pipe').substring(0, 7);
  process.chdir(tmp);
  fs.appendFileSync(
    'README.md',
    `\n\n> Published from \`${fromRef}\` on ${new Date().toISOString()}`,
  );
  run(`git add .`);
  const changes = run(`git status --porcelain`, 'pipe').trim();
  const hasChanges = !!changes;
  if (!hasChanges) {
    console.warn('\nNo changes detected. Exiting without publishing');
    process.exit(0);
  }

  console.log('\nChanges detected:');
  console.log(changes);
  run(`git commit -m "Publish actions from ${fromRef} to ${args.branch}"`);
  console.log('\nRecent commit history:');
  console.log(
    run(`git log --oneline`, 'pipe')
      .split('\n')
      .map((l) => `  ${l}`)
      .slice(0, 5)
      .join('\n'),
  );
  const publish = () => {
    console.log(run(`git push origin HEAD:${args.branch}`, 'pipe'));
    process.exit(0);
  };
  if (args.yes) {
    publish();
  } else {
    rl.question(`\nDo you want to push to branch ${args.branch}? (y/n) `, function (answer) {
      if (answer === 'y') {
        publish();
      } else {
        console.error('Changes were not pushed');
        process.exit(1);
      }
    });
  }
}

void main();
