# Deprecations Process

Any time we introduce a breaking change to a CDS library, we follow a deprecation process to ensure consumers are fully aware of the change and have all the resources they need to migrate to a better alternative. This process takes a quarter to complete, from marking something as "deprecated" to removal from the library, and aiding consumers in migrating off of it.

A "deprecation" can refer to a component, function, parameter, prop, hook, type, or token.

**Note**: Frozen and alpha components are _not_ considered deprecations.

What qualifies as a deprecation? If you answer yes to any of the following questions, what you're doing will result in something being deprecated:

- Are you moving something to a different directory?
- Are you deleting something? A parameter, prop, component, or function?
- Are you replacing something?

Any time we move or delete an export, we need to deprecate it first, and indicate to the user what they should use instead on our doc site at [go/cds-deprecations](http://go/cds-deprecations).

## How to Deprecate Something

1. The deprecation process is considered DX UI Systems Guild "tech debt", so it's important that you create a Jira ticket using [go/jira-dx](http://go/jira-dx) and use the `#cds-q<CURRENT_QUARTER>-deprecations` label to track your deprecations efforts.
2. Add a JSDoc `@deprecated` comment to the export you will be moving/removing and indicate an end of life data, eg: `@deprecated this component will be removed from CDS Q22023`.
3. Add the deprecation to the [Deprecations Config](https://github.cbhq.net/frontend/cds/blob/master/apps/website/scripts/deprecations/deprecations.ts). If there isn't a config for the current quarter, add on using the convention: `endOfLife: 'Q<QUARTER><YEAR>'`.
4. For the `prevMajorVersion` key use the _branch_ of the last major release that still includes all the deprecations. This will be used to generate version controlled URL's to deprecations.
5. In the deprecation config, indicate the "type" of deprecation --see section below on [Deprecation Types](#types-of-deprecations).
6. Provide migration guidance for every deprecation using the `migrationMap` property. Each key will map to a value you provided for `type`. If a deprecation is being removed completely with not replacement, a `migrationMap` is not required.
7. Delete everything on the [website/docs/resources/deprecations.mdx](apps/website/docs/resources/deprecations.mdx) page below the `<!-- template-start -->` line.
8. Run `yarn nx run website:deprecations` to update the page.
9. Cut a PR, once it merges, make sure it deploys to `cds-docs-production`
10. Close your Jira ticket.

### <a name="#types-of-deprecations"></a> Types of Deprecations

#### renamed

- The deprecation has been renamed.
- The export remains in the same file, but the export name as changed.

#### replaced

- The deprecation has been replaced with something else that is essentially an equivalent.
- If the API has changed, please indicate 1:1 replacements in the `migrationMap` in the Deprecation Config.
- Include the `path` of the replacement as well. **Note**: do not include `path` in the `type` field, but include it in the `migrationMap`.

#### path

- Deprecation name stays the same, but is now exported from another path.

#### api

- The API of a component of function has changed. This includes function parameters and component properties.

#### propValue

- The possible value(s) of a property has changed. The property itself remains the same.

## Quarterly Deprecations Process

1. At the beginning of each quarter, audit all CDS libraries for deprecations that were added in the last quarter. Make sure they are all listed in the [Deprecations Config](https://github.cbhq.net/frontend/cds/blob/master/apps/website/scripts/deprecations/deprecations.ts), if they aren't please add them with recommended migration guidance.
2. Once the Deprecations page has been updated, make an announcement in #announcements-cds indicating upcoming deprecations, and link to go/cds-deprecations.
3. Create a protected feature branch using the convention: `deprecations-q<QUARTER><YEAR>`.
4. Delete all deprecations and usage within CDS libraries (on the branch you created in the previous step).
5. At the end of the quarter, merge your feature branch into master and cut a major breaking release.

<!-- COMING SOON! Add steps to create cds-migration scripts to automate migrations -->
