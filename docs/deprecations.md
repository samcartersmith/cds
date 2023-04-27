# Deprecations Process

Any time we introduce a breaking change to a CDS library that cannot be fully handled with [cds-migrator](../packages/cds-migrator/README.md), we follow a deprecation process to ensure consumers are fully aware of the change and have all the resources they need to manually migrate to a better alternative. This process takes at least one quarter to complete, from marking something as "deprecated" to removal from the library, and includes aiding consumers with migration.

A "deprecation" can refer to a component, function, parameter, prop, hook, type, or token.

**Note**: Frozen and alpha components are _not_ considered deprecations.

What qualifies as a deprecation? If you can answer yes to any of the following questions, what you're doing will result in something being deprecated:

- Are you moving something to a different directory?
- Are you deleting something? A parameter, prop, component, or function?
- Are you replacing something?
- Is the [cds-migrator](../packages/cds-migrator/README.md) incapable of fully handling the change?

When we deprecate something, we need to indicate a replacement or workaround for the user on our docs site at [go/cds-deprecations](http://go/cds-deprecations).

## How to Deprecate Something

1. When introducing a deprecation, its end of life (EOL) is the end of the following quarter (e.g. a deprecation introduced any time in Q12023 has an EOL at the end of Q22023). This ensures that consumers have at least one full quarter to manually migrate away from the deprecation before we remove it.
2. The deprecation process is considered DX UI Systems Guild "tech debt", so it's important that you create a Jira ticket using [go/jira-dx](http://go/jira-dx) and use the `cds-q<EOL_QUARTER>-deprecations` label to track your deprecation efforts.
3. Add a JSDoc `@deprecated` comment to the export you will be moving/removing and indicate an end of life date, eg: `@deprecated this component will be removed from CDS at the end of Q22023`.
4. Add the deprecation to the [Deprecations Config](../apps/website/scripts/deprecations/deprecations.ts). If there isn't a config for the EOL quarter, add a new one in the [configs](../apps/website/scripts/deprecations/configs/) directory.
5. For the `prevMajorVersion` key, if necessary, update the value to the _version_ of the latest release (e.g. "v4.1.3") that still includes all current deprecations. This will be used to generate version controlled URLs to deprecations.
6. In the deprecation config, indicate the "type" of deprecation --see section below on [Deprecation Types](#types-of-deprecations).
7. Provide migration guidance for every deprecation using the `migrationMap` property. Each key will map to a value you provided for `type`. If a deprecation is being removed completely with no replacement, a `migrationMap` is not required.
8. Run `yarn nx run website:deprecations` to update the page.
9. Cut a PR and merge it.
10. Close your Jira ticket.

### <a name="#types-of-deprecations"></a> Types of Deprecations

#### renamed

- The deprecation has been renamed.
- The export remains in the same file, but the export name has changed.

#### replaced

- The deprecation has been replaced with something else that is essentially an equivalent.
- If the API has changed, please indicate 1:1 replacements in the `migrationMap` in the Deprecation Config.
- Include the `path` of the replacement as well. **Note**: do not include `path` in the `type` field, but include it in the `migrationMap`.

#### path

- Deprecation name stays the same, but is now exported from another path.

#### api

- The API of a component or function has changed. This includes function parameters and component properties.

#### propValue

- The possible value(s) of a property has changed. The property itself remains the same.

## Quarterly Deprecations Process

1. At the beginning of each quarter, audit all CDS libraries for deprecations that were added in the last quarter. Make sure they are all listed in the [Deprecations Config](../apps/website/scripts/deprecations/deprecations.ts). If they aren't, please add them with recommended migration guidance and regenerate the deprecations page ([How to Deprecate Something](#how-to-deprecate-something), steps #4 - #9).
2. Once the Deprecations page has been updated, make an announcement in #announcements-cds indicating upcoming deprecations, and link to go/cds-deprecations.
3. At the end of the quarter, create a [Release Candidate](./release/release-candidate.md) for the next breaking release if one doesn't already exist.
4. On that branch, delete all deprecations that have an EOL at the end of the current quarter and remove their usage within CDS libraries. Add a [Migration Guide](../apps/website/docs/guides/migration) to assist consumers with manual migrations. Remove those same deprecations from the [Deprecations Config](../apps/website/scripts/deprecations/deprecations.ts) and regenerate the deprecations page ([How to Deprecate Something](#how-to-deprecate-something), steps #8 - #9).
5. When ready, merge the [Release Candidate](./release/release-candidate.md) branch into master and cut a major breaking release.

<!-- COMING SOON! Add steps to create cds-migration scripts to automate migrations -->
