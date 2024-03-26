# Adoption Tracker Config Modification

> A quick guide on how to modify the adoption tracker config.

For details regarding Adoption Tracker Development: See [Adoption Tracker Development Docs](../adoption-tracker-development.md)

## Overview

The adoption tracker config is the key source for our data. This guide covers how to modify it.

config - `apps/website/scripts/adoption/config.ts`

## Adding to Adoption Tracker (Adoption Overview) Data

To add a project to the adoption tracker, you need to modify the `config` object. The key additions would be the following:

```
{
    root: path to repo
    github: path to github
    tsconfigFileName: name of tsconfig if exists
    id: id
    label: label
    projectTsAliases: optional ts project aliases
    type: 'doc',
    dependencyPath: path to dependencies (package.json) where CDS exists
    projectGitPath: path to directly to github repo for navigation
},
```

Example:

```
{
    root: path.join(tempDir, retailMobileGit),
    github: retailMobileGit,
    tsconfigFileName: 'tsconfig.base.json',
    id: 'retail-mobile',
    label: 'Retail Mobile',
    projectTsAliases: ['@app'],
    type: 'doc',
    dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/app'),
    projectGitPath: 'src/packages/app',
},
```

## Adding to CUJ (Core User Journey) (CUJ Overview) Data

To add to the CUJ data, we need to modify the `coreUserJourneyConfig` object. Each entry is a CUJ. We add repositories that are part of the CUJ in the items array. The format within the items array is exactly the same as the adoption tracker config above but it has an emphasis on the `sourceGlob`. All entries in the `sourceGlob` must be in sourceGlob format. So, instead of a direct path to .ts or .tsx file, we need to use `.(ts|tsx)`. If it is a directory, we add `/**/*.(ts|tsx)` to the end.

Example item in CUJ object

```
{
    root: path.join(tempDir, retailMobileGit),
    github: retailMobileGit,
    tsconfigFileName: 'tsconfig.base.json',
    id: 'rn-adv-portfolio-cuj',
    label: 'RN Adv Portfolio CUJ',
    type: 'doc',
    projectTsAliases: ['@app'],
    sourceGlob: [
        'screens/CoinbaseHelp/**/*.(ts|tsx)', // directory
        'hooks/useSupportHomeNavigation/useSupportHomeNavigation.(ts|tsx)', // file
        'hooks/subscription/useNavigateToSupportScreen.(ts|tsx)', // file
        'screens/Support/**/*.(ts|tsx)',
    ],
    dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/app'),
    projectGitPath: 'src/packages/app/src/screens/CoinbaseHelp',
},
```

## Adding to Product Component Data

To add to the product component data, we modify `productComponentConfig`. We don't require as many details for product components and only need the following:

```
  {
    productComponentName: name
    owningTeam: owning team
    packageImportPath: name of package that is imported
    doc: optional url to docs
    packagePath: path to package
  },
```

Example

```
  {
    productComponentName: 'AppSwitcher',
    owningTeam: 'Identity',
    packageImportPath: '@cbhq/app-switcher',
    doc: 'https://docs.cbhq.net/frontend/platform/identity/app-switcher/integration-guide',
    packagePath: path.join(tempDir, identityGit, 'packages/app-switcher/package.json'),
  },
```
