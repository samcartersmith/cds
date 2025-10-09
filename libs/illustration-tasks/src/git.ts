import { execSync, type ExecSyncOptions } from 'node:child_process';
import path from 'node:path';

const todaysDate = new Date().toISOString().slice(0, 10);
const targetBranchName = `illustrations/${todaysDate}`;

const error = (message: string, ...args: unknown[]) => {
  console.error('\nERROR:', message, ...args);
  console.log('');
  process.exit(1);
};

const createExec = (dirname: string) => {
  return (command: string, options: ExecSyncOptions = {}) =>
    execSync(command, { cwd: dirname, encoding: 'utf-8', ...options })
      .toString()
      .trim();
};

export const validateFreshRepo = (dirname: string) => {
  const repoName = path.basename(dirname);
  const exec = createExec(dirname);
  console.log(`Checking the current branch for the "${repoName}" repo...`);
  const gitBranch = exec('git branch --show-current');
  if (gitBranch !== 'master') error(`The "${repoName}" repo is not on the "master" branch`);
  console.log(`Checking the status of the "${repoName}" repo...`);
  const gitStatus = exec('git status --short');
  if (gitStatus.length > 0) error(`The "${repoName}" repo is not clean`);
  console.log(`Checking the diff of the "${repoName}" repo...`);
  const gitDiff = exec('git diff --exit-code');
  if (gitDiff.length > 0) error(`The "${repoName}" repo has changes`);
  try {
    console.log(`Checking the "origin" remote for the "${repoName}" repo...`);
    exec('git remote show origin');
  } catch (err) {
    error(`There was an error checking the "origin" remote for the "${repoName}" repo:`, err);
  }
  try {
    console.log(`Fetching the "origin" remote for the "${repoName}" repo...`);
    exec('git fetch origin');
  } catch (err) {
    error(`There was an error fetching the "origin" remote for the "${repoName}" repo:`, err);
  }
  console.log(
    `Checking for changes on the local master branch that are not on the origin/master branch...`,
  );
  const gitBranchChanges = exec('git log origin/master..master');
  if (gitBranchChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the local master branch that are not on the origin/master branch`,
    );
  console.log(
    `Checking for changes on the origin/master branch that are not on the local master branch...`,
  );
  const gitOriginChanges = exec('git log master..origin/master');
  if (gitOriginChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the origin/master branch that are not on the local master branch`,
    );
};

export const prepareTargetRepo = (dirname: string) => {
  const exec = createExec(dirname);
  try {
    console.log(`Attempting to delete branch ${targetBranchName}...`);
    exec(`git branch -D ${targetBranchName}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Branch may not exist, that's ok
  }
  console.log(`Creating new branch ${targetBranchName}...`);
  exec(`git checkout -b ${targetBranchName}`);
  return targetBranchName;
};

export const commitAndPushChanges = (dirname: string) => {
  const exec = createExec(dirname);
  exec(`git add . && git commit -m "feat: Publish illustrations ${todaysDate}"`);
  exec(`git push origin ${targetBranchName}`);
};
