# CDS Repo Sync

This guide explains syncing the CDS repo from github.com/coinbase/cds to github.cbhq.net/frontend/cds-internal

This sync process is necessary to temporarily continue publishing `@cbhq` npm packages on our internal artifactory. We will stop publishing these `@cbhq` npm packages once the CDS v8 migration is complete.

### How to sync

1. Copy the [cds-repo-sync.mjs](../cds-repo-sync.mjs) script to a directory where you want to clone the repos
2. Run the script with `node cds-repo-sync.mjs`
3. The script will clone `temp-internal-cds` and `temp-oss-cds` repos, and push a new branch to github.cbhq.net/frontend/cds-internal
4. You can delete the `temp-internal-cds` and `temp-oss-cds` repos after the sync is complete
5. Check the [most recently merged sync PR](https://github.cbhq.net/frontend/cds-internal/pulls?q=is%3Apr+is%3Aclosed+head%3Aupdate-) to get the previous sync commit id
6. Create a new PR in frontend/cds-internal using [this PR as an example](https://github.cbhq.net/frontend/cds-internal/pull/25), linking from the previous sync commit id to the new sync commit id
