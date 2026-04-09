---
name: cds-repo-sync
description: Sync the CDS repository from github.com/coinbase/cds to github.cbhq.net/frontend/cds-internal to publish `@cbhq`-scoped packages to the internal npm registry. Use when the user mentions CDS repo sync, `frontend/cds-internal`, `cds-repo-sync.mjs`, internal `@cbhq` package publishing syncs, or troubleshooting the sync workflow and PR handoff.
---

# CDS Repo Sync

Sync CDS from github.com to the internal mirror so that `@cbhq`-scoped npm packages continue to be published on the internal artifactory until the CDS v8 migration is complete.

## Environment Requirements

- **Coinbase VPN** (full tunnel preferred) — verify you are connected before starting; `github.cbhq.net` and the internal npm registry are not reachable without it.
- **Node.js >= 21.2.0** (the script uses `import.meta.dirname` which is not available in earlier versions). The repo `.nvmrc` pins 20.9.0 for general development, so you must invoke the sync script with a newer Node binary, e.g. `~/.nvm/versions/node/v22.22.1/bin/node -e "import('./cds-repo-sync.mjs')"`.
- `git-filter-repo` must be installed via Homebrew. The script expects it at `/opt/homebrew/bin/git-filter-repo`.
- A **GitHub MCP server** configured with access to `github.cbhq.net` (preferred for searching previous sync PRs and creating the new PR). Falls back to `gh` CLI authenticated for `github.cbhq.net` if MCP is unavailable.

## Workflow

### Phase 1: Local sync

1. Delete `temp-oss-cds` and `temp-internal-cds` directories if they exist from a previous run. The script will error if they are present.
2. Run the sync script (`scripts/cds-repo-sync.mjs`) with a Node.js version >= 21.2.0:
   ```sh
   ~/.nvm/versions/node/v22.22.1/bin/node -e "import('./cds-repo-sync.mjs')"
   ```
3. The script clones both repos, rewrites history, merges, runs `yarn && yarn dedupe`, and writes a manifest to `scripts/sync-manifest.json` containing `branchName`, `commitId`, `owner`, `repo`, and `internalRepoPath`. It does **not** push — the agent handles that next.

### Phase 2: Push the branch

Read the manifest from `scripts/sync-manifest.json` and push the branch to `github.cbhq.net/frontend/cds-internal` using one of the strategies below. **Do not delete the temp directories until the push succeeds.**

4. **Push — GitHub MCP** (preferred):

   1. Use `create_branch` with owner `frontend`, repo `cds-internal`, branch `<branchName>`, from_branch `master`.
   2. Run `git diff --name-status origin/master` inside `<internalRepoPath>` to get added (`A`), modified (`M`), and deleted (`D`) files.
   3. For added and modified files: read each file's content from the local clone at `<internalRepoPath>/<path>` and call `push_files` with owner `frontend`, repo `cds-internal`, branch `<branchName>`, and a commit message like `Sync <commitId>`. Batch files to stay within API limits (≤ 20 files per call). **Skip binary files** (images, fonts, etc.) — they cannot be pushed as string content.
   4. For deleted files: call `delete_file` for each with owner `frontend`, repo `cds-internal`, branch `<branchName>`, and a commit message like `Delete <path>`.

5. **Push — `gh` CLI** (fallback):
   ```sh
   cd <internalRepoPath>
   git remote set-url origin "https://x-access-token:$(gh auth token --hostname github.cbhq.net)@github.cbhq.net/frontend/cds-internal.git"
   git push origin <branchName>
   ```
   This reconfigures the remote to HTTPS, authenticates with a token from `gh auth`, and performs a full git push (preserves merge history, handles binary files).

### Phase 3: Clean up and create PR

6. After the push succeeds, delete the temp directories (`temp-oss-cds`, `temp-internal-cds`) and `scripts/sync-manifest.json`.
7. Find the previous sync commit id by searching for the most recently merged sync PR:
   - **With GitHub MCP** (preferred): Use `search_pull_requests` with owner `frontend`, repo `cds-internal`, and query `is:merged head:update-`, sort by `updated`, order `desc`.
   - **With `gh` CLI** (fallback): `gh pr list --repo github.cbhq.net/frontend/cds-internal --state merged --search "head:update-" --limit 1 --json headRefName --jq '.[0].headRefName'`
   - Extract the short commit id from the branch name (e.g. `update-ba60c15` → `ba60c15`).
8. Create the new PR:

   - **With GitHub MCP** (preferred): Use `create_pull_request` with owner `frontend`, repo `cds-internal`, base `master`, head `update-<shortCommitId>`, and the title/body below.
   - **With `gh` CLI** (fallback):

     ```sh
     gh pr create --repo github.cbhq.net/frontend/cds-internal \
       --base master --head update-<shortCommitId> \
       --title "chore: Update <shortCommitId>" \
       --body "## What changed? Why?

     * Sync coinbase/cds updates from [<prevCommitId> to <newCommitId>](https://github.com/coinbase/cds/compare/<prevCommitId>...<newCommitId>)"
     ```

## Important Checks

- The cloned repos must be on clean `master` branches with no local-only or remote-only drift before the sync continues.
- The script prepares a branch named `update-<shortCommitId>` locally, where the suffix comes from the OSS CDS `HEAD` commit. It writes a manifest but does **not** push — the agent must push the branch separately.
- The script rewrites history to replace `@coinbase` with `@cbhq` and `cds.coinbase.com` with `cds.cbhq.net`.
- The script runs `yarn && yarn dedupe`, stages the resulting changes, and may create a `Regen yarn.lock` commit if needed.
- When pushing via MCP `push_files`, binary files (images, fonts) cannot be included. If the sync introduces binary file changes, prefer the `gh` CLI push strategy instead.

## Troubleshooting

- **`temp-oss-cds` or `temp-internal-cds` already exists**: Delete the leftover directories from a previous run and retry.
- **`git-filter-repo` not found**: Install with `brew install git-filter-repo`. The script expects the binary at `/opt/homebrew/bin/git-filter-repo`.
- **Clone fails with SSH errors**: Verify SSH keys are configured for both `github.com` and `github.cbhq.net`.
- **Repo validation fails (not clean / not on master / local-remote drift)**: The script freshly clones both repos, so this typically means a prior run left state behind. Delete both temp directories and re-run.
- **`import.meta.dirname` is `undefined` / `ERR_INVALID_ARG_TYPE`**: The script requires Node.js >= 21.2.0. The repo `.nvmrc` pins 20.9.0 which does not support `import.meta.dirname`. Use a newer Node binary explicitly (e.g. `~/.nvm/versions/node/v22.22.1/bin/node`).
- **`yarn && yarn dedupe` fails**: Check that the Node.js version matches `.nvmrc`. Run `nvm use` if needed before re-running.
- **Push fails (branch already exists on remote)**: A previous sync attempt pushed the same branch. Delete it on the remote (`git push origin --delete update-<shortCommitId>`, or via MCP/`gh api`) and re-push.
- **MCP `push_files` fails for large syncs**: The diff may be too large for the GitHub API. Fall back to the `gh` CLI HTTPS push strategy, which performs a native git push.

## Response Guidelines

- Keep guidance procedural and concise.
- Prefer the documented workflow over inventing alternate sync steps.
- If the user asks for help after the script finishes, focus on the branch name, previous sync PR, and the commit range that should be linked in the new PR.
