import { run } from './run';

export const DEFAULT_BASE_BRANCH_NAME = 'master';

/**
 * @returns `true` if the file exists in the repository at a given git ref
 */
function fileExists(ref: string, file: string): boolean {
  return git.listAllFiles(ref, file).includes(file);
}

/**
 * @returns the current branch name
 */
function getBranchName(): string {
  return run(`git rev-parse --abbrev-ref HEAD`, 'pipe');
}

/**
 * Read the file contents from a git ref
 * NOTE: This is VERY expensive and should be used sparingly
 * @throws {Error} if the file does not exist
 */
function getMergeBase(ref: string, baseRef: string): string {
  return run(`git merge-base ${ref} ${baseRef}`, 'pipe');
}

function merge(baseRef: string) {
  // Merge latest master into this branch so that when we diff the schema files, we're only comparing
  // what the user has changed in their branch. Otherwise we'll get false positives if this branch isn't
  // up to date with master and someone merged other schema into master. If this merge fails, it'll throw
  // and CI will fail. This is fine since it means the user has merge conflicts. We also need to set some fake
  // user name/email for git to be happy.
  run('git config --global user.email "test@test.com"');
  run('git config --global user.name "test"');
  return run(`git merge --no-ff --no-commit ${baseRef}`, 'pipe');
}

/**
 * @returns the remote url for the git repository
 */
function getRemoteUrl(name = 'origin'): string {
  return run(`git remote get-url "${name}"`, 'pipe');
}

/**
 * @returns the current repo name in the form of `<org>/<repo>`
 */
function getRepoName(): string {
  const url = getRemoteUrl();
  return git.parseRepoNameFromUrl(url);
}

/**
 * Converts a named-ref to a commit sha
 */
function getSha(ref: string): string {
  return run(`git rev-parse ${ref}`, 'pipe');
}

/**
 * @returns`true` if the repository has uncommitted changes
 */
function isDirty() {
  return run('git status --porcelain', 'pipe').length > 1;
}

/**
 * List all files in the repository at a given git ref
 */
function listAllFiles(ref: string, pattern?: string): string[] {
  return run(`git ls-tree -r --name-only ${ref} -- ${pattern ?? ''}`, 'pipe').split('\n');
}

/**
 * List files that were deleted since a git ref
 */
function listDeletedFiles(fromRef: string, toRef: string): string[] {
  return run(`git diff --name-only --diff-filter=D ${fromRef}...${toRef}`, 'pipe').split('\n');
}

/**
 * List only existing files that were modified since git ref
 */
function listModifiedFiles(fromRef: string, toRef: string): string[] {
  return run(`git diff --name-only --diff-filter=M ${fromRef}...${toRef}`, 'pipe').split('\n');
}

/**
 * List only new files that were added since a git ref
 */
function listNewFiles(fromRef: string, toRef: string): string[] {
  return run(`git diff --name-only --diff-filter=A ${fromRef}...${toRef}`, 'pipe').split('\n');
}

/**
 * List files that were renamed since a git ref
 */
function listRenamedFiles(fromRef: string, toRef: string): string[] {
  return run(`git diff --name-only --diff-filter=R ${fromRef}...${toRef}`, 'pipe').split('\n');
}

/**
 * List all changes on a given base branch
 */
function getChangesSinceBaseBranch(baseBranch: string): string[] {
  return run(`git diff origin/${baseBranch} HEAD`, 'pipe').split('\n');
}

/**
 * @returns the repo name in the form of `<org>/<repo>`
 */
function parseRepoNameFromUrl(gitUrl: string) {
  // Remote urls can be in the form of:
  // - git@github.cbhq.net:<org>/<repo>.git
  // - https://github.cbhq.net/<org>/<repo>
  const repoName = gitUrl.match(/[/:](([^/]+)\/([^/]+?))(\.git)?$/)?.[1];
  if (!repoName) {
    throw new Error(`Could not parse repo name from ${gitUrl}`);
  }
  return repoName;
}

/**
 * Read the file contents from a git ref
 * NOTE: This is VERY expensive and should be used sparingly
 * @throws {Error} if the file does not exist
 */
function readFileContents(ref: string, file: string): string {
  return run(`git show ${ref}:${file.replace(' ', '\\ ')}`, 'pipe');
}

/**
 * @returns root directory of the git repository
 */
function repoRoot(): string {
  return run('git rev-parse --show-toplevel', 'pipe');
}

/**
 * @returns list of branches in the repository
 */
function listRemoteBranches({
  pattern = '*',
}: {
  /**
   * Git pattern to filter branches by
   * @default "*"
   */
  pattern?: string;
} = {}): string[] {
  // Results look like:
  // e7da4533c7e370aea8e053dc670b462137243a22        refs/heads/release-app-10.21.x
  // 562df3597b4f71d52134a6cab968f27cf5189564        refs/heads/release-app-10.22.x
  return run(`git ls-remote --heads origin "${pattern}"`, 'pipe')
    .split('\n')
    .map((line) => line.split('\t').at(1)?.replace('refs/heads/', ''))
    .filter((branch): branch is string => !!branch);
}

export type Commit = {
  sha: string;
  message: string;
  author: string;
  date: Date;
};
function log({ from, to, count }: { from: string; to?: string; count?: number }): Commit[] {
  return run(
    `git log --pretty=format:"%h\t%an\t%cd\t%s" --date=iso8601 ${from} ${to ?? ''} ${
      count ? `-n ${count}` : ''
    }`,
    'pipe',
  )
    .trim()
    .split('\n')
    .flatMap((line) => {
      if (line.trim() === '') return [];
      const [sha, author, date, ...message] = line.split('\t');
      return { sha: sha.substring(0, 7), author, date: new Date(date), message: message.join(' ') };
    });
}

function fetch({
  remote,
  ref,
  unshallow,
}: { remote?: string; ref?: string; unshallow?: boolean } = {}) {
  run(`git fetch ${remote ?? 'origin'} ${ref ?? ''} ${unshallow ? '--unshallow' : ''}`);
}

/**
 * Fetch the commits between two refs until a merge base is found
 * @returns the commit details of the merge base
 */
function fetchToMergeBase({
  fromRef,
  toRef,
  remote = 'origin',
  maxDepth = 2000,
  depthPerFetch = 100,
}: {
  fromRef: string;
  toRef: string;
  remote?: string;
  maxDepth?: number;
  depthPerFetch?: number;
}): Commit {
  let mergeBase;
  for (let i = 0; i < maxDepth; i += depthPerFetch) {
    try {
      mergeBase = run(`git merge-base ${remote}/${fromRef} ${remote}/${toRef}`, 'pipe');
      break;
    } catch (error) {
      run(`git fetch -q --deepen=${depthPerFetch} ${remote} ${fromRef}`);
    }
  }
  if (!mergeBase) {
    throw new Error(
      `Could not find merge base for ${fromRef} and ${toRef} after ${maxDepth} commits`,
    );
  }
  const mergeBaseCommit = git.log({ from: mergeBase, count: 1 }).at(0);
  if (!mergeBaseCommit) {
    throw new Error(`Could not find merge base for ${fromRef} and ${toRef}`);
  }
  return mergeBaseCommit;
}

function tag({ name, ref, force }: { name: string; ref?: string; force?: boolean }) {
  run(`git tag ${name} ${ref} ${force ? '-f' : ''}`);
  run(`git push -f origin refs/tags/${name}`);
}

function push({
  ref,
  upstream,
  force,
}: {
  ref?: string;
  upstream?: string;
  tags?: boolean;
  force?: boolean;
}) {
  run(`git push ${upstream ? `-u ${upstream}` : ''} ${force ? '-f' : ''} ${ref ?? ''}`);
}

function noMutationsOrRemoteCallsInTests<TFn extends (...args: any[]) => unknown>(fn: TFn) {
  if (process.env.NODE_ENV === 'test') {
    return () => {
      throw new Error(
        `git.mutations.${fn.name} is not mocked. Git functions that make mutations are not allowed to be called in tests. Make sure you properly mock the git mutations in your tests.`,
      );
    };
  }
  return fn;
}
function noRemoteCallsInTests<TFn extends (...args: any[]) => unknown>(fn: TFn) {
  if (process.env.NODE_ENV === 'test') {
    return () => {
      throw new Error(
        `git.${fn.name} is not mocked. Git functions that make remote calls are not allowed to be called in tests. Make sure you properly mock the git remote calls in your tests.`,
      );
    };
  }
  return fn;
}

function checkout(ref: string) {
  run(`git checkout -f ${ref}`);

  // allows the caller to checkout back to the original branch
  return () => {
    run(`git checkout -f -`);
  };
}

export const git = {
  /* These functions are mutative */
  mutations: {
    tag: noMutationsOrRemoteCallsInTests(tag),
    push: noMutationsOrRemoteCallsInTests(push),
  },
  fetch: noRemoteCallsInTests(fetch),
  fetchToMergeBase: noRemoteCallsInTests(fetchToMergeBase),
  fileExists,
  getBranchName,
  getMergeBase,
  getRemoteUrl,
  getRepoName,
  getSha,
  isDirty,
  listAllFiles,
  listDeletedFiles,
  listModifiedFiles,
  listNewFiles,
  listRemoteBranches: noRemoteCallsInTests(listRemoteBranches),
  listRenamedFiles,
  log,
  parseRepoNameFromUrl,
  readFileContents,
  repoRoot,
  checkout,
  merge,
  getChangesSinceBaseBranch,
};
