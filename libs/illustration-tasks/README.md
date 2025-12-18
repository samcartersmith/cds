# @cbhq/illustration-tasks

Figma task to sync illustrations to the CDS OSS repo.

Follow instructions in [docs/release/illustrations.md](../docs/release/illustrations.md).

## Sync Illustrations

```sh
yarn nx run illustration-tasks:sync-illustrations
```

## Verify Sync Determinism

Use this command to verify if your local changes create the same set of output files as what is on master.

```sh
yarn nx run illustration-tasks:verify-sync
```
