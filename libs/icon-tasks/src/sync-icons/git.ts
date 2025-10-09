import { execSync } from 'node:child_process';
import path from 'node:path';

const todaysDate = new Date().toISOString().slice(0, 10);
const targetBranchName = `icons/${todaysDate}`;

const error = (message: string, ...args: unknown[]) => {
  console.error('ERROR: ', message, ...args);
  console.log('');
  process.exit(1);
};

export const validateFreshRepo = (dirname: string) => {
  const repoName = path.basename(dirname);

  const exec = (command: string) => execSync(command, { cwd: dirname }).toString().trim();

  const gitBranch = exec('git branch --show-current');
  if (gitBranch !== 'master') error(`The "${repoName}" repo is not on the "master" branch`);
  const gitStatus = exec('git status --short');
  if (gitStatus.length > 0) error(`The "${repoName}" repo is not clean`);
  const gitDiff = exec('git diff --exit-code');
  if (gitDiff.length > 0) error(`The "${repoName}" repo has changes`);
  try {
    exec('git remote show origin');
  } catch (err) {
    error(`There was an error checking the "origin" remote for the "${repoName}" repo:`, err);
  }
  try {
    exec('git fetch origin');
  } catch (err) {
    error(`There was an error fetching the "origin" remote for the "${repoName}" repo:`, err);
  }
  const gitBranchChanges = exec('git log origin/master..master');
  if (gitBranchChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the local master branch that are not on the origin/master branch`,
    );
  const gitOriginChanges = exec('git log master..origin/master');
  if (gitOriginChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the origin/master branch that are not on the local master branch`,
    );
};

export const prepareTargetRepo = (dirname: string) => {
  const exec = (command: string) => execSync(command, { cwd: dirname }).toString().trim();
  try {
    exec(`git branch -D ${targetBranchName}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Branch may not exist, that's ok
  }
  exec(`git checkout -b ${targetBranchName}`);
  return targetBranchName;
};

export const commitAndPushChanges = (dirname: string) => {
  const exec = (command: string) => execSync(command, { cwd: dirname }).toString().trim();
  exec(`git add . && git commit -m "feat: Publish icons ${todaysDate}"`);
  exec(`git push origin ${targetBranchName}`);
};
