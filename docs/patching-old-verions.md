# Patching Old CDS Versions

## Context

The CDS codebase is continuously evolving. Transitioning between major versions typically takes more than a quarter. During this transition period, there may be a need to fix issues for consumers using older versions of CDS. To address this need, we are introducing a formal process for patching older CDS versions.

## Criteria for Patching Old Versions

- **Patch for Incidents**: Fixes that are not incident-related should only be merged into the latest version of CDS. Example: [SelectOption overflow incident](https://github.cbhq.net/frontend/cds/pull/2800).
- **Code Red Requests**: For urgent issues requiring immediate attention. Example: [Error Banner](https://github.cbhq.net/frontend/cds/pull/2891).
- **Exceptions**: If the patch is not for an incident fix but you believe it is critical, please provide your reasoning and seek approval from CDS leads. Example: [NudgeCard fix](https://github.cbhq.net/frontend/cds/pull/2881).

## Process

### 1. Cut Protected Branch

When a new major version is about to be merged (e.g., transitioning from `v5.9.6` to `v6.0.0`), cut a protected branch from master to serve as a record for the last deprecated version, naming it `cds5-master`. This branch will be maintained for the lifetime of version 5. [Example branch](https://github.cbhq.net/frontend/cds/tree/cds5-master).

### 2. Patching

> **Note:** We maintain only the previous version of CDS. Older versions are not supported.

To create a patch, follow these steps:

1. Branch off the protected version branch (e.g., for patching CDS5, branch off `cds5-master`).
2. Create a PR against the **version branch**, including the incident ticket and version number in your PR title, if applicable. For example, `[IM-12596] fix(v5): Add maxWidth to SelectOption to prevent overflow`. [Example PR](https://github.cbhq.net/frontend/cds/pull/2800)
3. Create a PR against **master** to apply the same patch to the latest version. Ensure to update the changelog to preserve the full history of changes. [Example PR](https://github.cbhq.net/frontend/cds/pull/2806/files#diff-d6f382a0bdc03f2070f688df2be03f3f1633d5929aa2113d8aaef334dc9d5873R29)
