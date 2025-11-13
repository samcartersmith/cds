/* @ts-check */
/**
 * This script syncs the CDS repo from github.com/coinbase/cds to github.cbhq.net/frontend/cds-internal
 * Read the sync guide at https://github.cbhq.net/frontend/cds/docs/cds-repo-sync.md for more information
 */
import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const config = {
  // repo to sync from
  openSourceRepo: {
    name: 'coinbase/cds',
    cloneName: 'temp-oss-cds',
    url: 'git@github.com:coinbase/cds.git',
  },
  // repo to sync to
  internalRepo: {
    name: 'frontend/cds-internal',
    cloneName: 'temp-internal-cds',
    url: 'git@github.cbhq.net:frontend/cds-internal.git',
  },
  // https://github.com/newren/git-filter-repo for force rewriting git history
  gitFilterRepo: {
    expressionsFile: 'expressions.txt',
    expressions: `@coinbase==>@cbhq\ncds.coinbase.com==>cds.cbhq.net`,
  },
  createBranchName: (commitId) => `update-${commitId}`,
};

const __dirname = import.meta.dirname;

/**
 * @param {string} message
 * @param {unknown[]} args
 */
const error = (message, ...args) => {
  console.error('\nERROR:', message, ...args);
  console.log('');
  process.exit(1);
};

/**
 * @param {string} dirname
 * @returns {(command: string, options?: childProcess.ExecSyncOptions) => string}
 */
const createExec = (dirname) => {
  return (command, options = {}) =>
    childProcess.execSync(command, {
      cwd: dirname,
      encoding: 'utf-8',
      ...options,
    });
};

/**
 * @param {string} dirname
 */
export const validateFreshRepo = (dirname) => {
  const repoName = path.basename(dirname);
  const exec = createExec(dirname);
  console.log(`Checking the current branch for the "${repoName}" repo`);
  const gitBranch = exec('git branch --show-current').toString().trim();
  if (gitBranch !== 'master') {
    error(`The "${repoName}" repo is not on the "master" branch`);
  }
  console.log(`Checking the status of the "${repoName}" repo`);
  const gitStatus = exec('git status --short').toString().trim();
  if (gitStatus.length > 0) error(`The "${repoName}" repo is not clean`);
  console.log(`Checking the diff of the "${repoName}" repo`);
  const gitDiff = exec('git diff --exit-code').toString().trim();
  if (gitDiff.length > 0) error(`The "${repoName}" repo has changes`);
  try {
    console.log(`Checking the "origin" remote for the "${repoName}" repo`);
    exec('git remote show origin');
  } catch (err) {
    error(`There was an error checking the "origin" remote for the "${repoName}" repo:`, err);
  }
  try {
    console.log(`Fetching the "origin" remote for the "${repoName}" repo`);
    exec('git fetch origin');
  } catch (err) {
    error(`There was an error fetching the "origin" remote for the "${repoName}" repo:`, err);
  }
  console.log(
    `Checking for changes on the local master branch that are not on the origin/master branch`,
  );
  const gitBranchChanges = exec('git log origin/master..master').toString().trim();
  if (gitBranchChanges.length > 0) {
    error(
      `The "${repoName}" repo has changes on the local master branch that are not on the origin/master branch`,
    );
  }
  console.log(
    `Checking for changes on the origin/master branch that are not on the local master branch`,
  );
  const gitOriginChanges = exec('git log master..origin/master').toString().trim();
  if (gitOriginChanges.length > 0) {
    error(
      `The "${repoName}" repo has changes on the origin/master branch that are not on the local master branch`,
    );
  }
};

/**
 * @param {string} dirname
 * @param {string} targetBranchName
 */
export const prepareTargetRepo = (dirname, targetBranchName) => {
  const exec = createExec(dirname);
  try {
    console.log(`Attempting to delete branch ${targetBranchName}`);
    exec(`git branch -D ${targetBranchName}`);
  } catch (err) {
    // Branch may not exist, that's ok
  }
  console.log(`Creating new branch ${targetBranchName}`);
  exec(`git checkout -b ${targetBranchName}`);
  return targetBranchName;
};

const main = () => {
  console.log(`Starting sync from ${config.openSourceRepo.name} to ${config.internalRepo.name}`);

  const openSourceRepoPath = path.join(__dirname, config.openSourceRepo.cloneName);
  const internalRepoPath = path.join(__dirname, config.internalRepo.cloneName);

  if (fs.existsSync(openSourceRepoPath)) {
    error(
      `The "${config.openSourceRepo.cloneName}" directory already exists at "${openSourceRepoPath}"`,
    );
  }

  if (fs.existsSync(internalRepoPath)) {
    error(
      `The "${config.internalRepo.cloneName}" directory already exists at "${internalRepoPath}"`,
    );
  }

  const exec = createExec(__dirname);

  console.log('Checking if git-filter-repo is installed');
  const gitFilterRepoInstalled = exec('which git-filter-repo').toString().trim();

  if (gitFilterRepoInstalled !== '/opt/homebrew/bin/git-filter-repo') {
    error(
      `git-filter-repo is not installed via Homebrew, please install it with "brew install git-filter-repo"`,
    );
  }

  console.log(`Cloning ${config.openSourceRepo.name} to ${openSourceRepoPath}`);
  childProcess.execSync(`git clone ${config.openSourceRepo.url} ${openSourceRepoPath}`, {
    cwd: __dirname,
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  console.log(`Cloning ${config.internalRepo.name} to ${internalRepoPath}`);
  childProcess.execSync(`git clone ${config.internalRepo.url} ${internalRepoPath}`, {
    cwd: __dirname,
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  console.log('Validating repo freshness');
  validateFreshRepo(openSourceRepoPath);
  validateFreshRepo(internalRepoPath);

  const openSourceRepoCommitString = exec('git rev-parse HEAD', {
    cwd: openSourceRepoPath,
  })
    .toString()
    .trim();

  const openSourceRepoCommitId = openSourceRepoCommitString.substring(0, 7);

  console.log(`The ${config.openSourceRepo.name} repo is at commit ${openSourceRepoCommitId}`);

  console.log(`Creating the git filter-repo expressions file`);

  exec(`echo "${config.gitFilterRepo.expressions}" > ${config.gitFilterRepo.expressionsFile}`, {
    cwd: openSourceRepoPath,
  });

  console.log(`Rewriting the history of the ${config.openSourceRepo.name} repo`);

  exec(`git filter-repo --replace-text ${config.gitFilterRepo.expressionsFile} --force`, {
    cwd: openSourceRepoPath,
  });

  const branchName = config.createBranchName(openSourceRepoCommitId);

  prepareTargetRepo(internalRepoPath, branchName);

  exec(`git remote add temp ../${config.openSourceRepo.cloneName}`, {
    cwd: internalRepoPath,
  });

  exec('git fetch temp master', {
    cwd: internalRepoPath,
  });

  exec('git merge remotes/temp/master --allow-unrelated-histories --strategy-option theirs', {
    cwd: internalRepoPath,
  });

  exec('git remote remove temp', {
    cwd: internalRepoPath,
  });

  exec('yarn && yarn dedupe && git add .', {
    cwd: internalRepoPath,
  });

  try {
    exec("git commit -m 'Regen yarn.lock'", {
      cwd: internalRepoPath,
    });
  } catch (err) {
    if (!err.stdout.includes('nothing to commit, working tree clean')) {
      error(`There was an error committing the changes:`, err);
    }
  }

  exec(`git push origin ${branchName}`, {
    cwd: internalRepoPath,
  });

  console.log(`Sync complete!`);
  console.log(
    `You can now create a PR from the branch ${branchName} to ${config.internalRepo.name}`,
  );
};

main();
