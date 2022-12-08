# @cbhq/cds-illustrations

CDS illustrations used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-illustrations
```

## Overview

The [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations) are composed of vectors which leverage the [CDS Figma Illustration light color styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6) to power their color fills. This allows design to create a single light mode version and engineering handles creating the dark mode version through the CDS Figma plugin or through code generation.

In order for engineering to be able to generate a dark mode versions of an illustration asset, we need to pull information about the light and dark mode color styles from Figma.

The `@figma-tasks:sync-styles` handles pulling styles from Figma and allows configuration of where to output the generated data. For illustrations, the color styles are output to the `@cbhq/cds-illustrations/__generated__/styles` directory when running the `yarn nx run illustrations:sync-light-styles` or `yarn nx run illustrations:sync-dark-styles` commands.

Once we have the generated color styles data, we can then use those files as inputs for the CDS Figma plugin and `@cbhq/figma-tasks:sync-illustrations` task so they are able to convert illustration assets from light -> dark or dark -> light.

## Short term plan

Configure the illustration's project.json sync task to output the generated assets to relevant packages (common, mobile, web) to ensure parity with old illustration pipeline structure to minimize risk of new pipeline rollout.

## Long term plan

Make `@cbhq/cds-illustrations` a dependency or peer dependency of the relevant packages (common, mobile, web) and configure all generated assets to be output to the illustration's `src/__generated__` folder instead of to the consuming packages. The consuming packages then pull in necessary files directly from `@cbhq/cds-illustrations`.

## Sync tasks

### Illustration assets (bi-weekly relese cycle)

- [Figma Illustration assets](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations)

To sync illustrations with Figma, run the command below and commit the generated files.

```shell
yarn nx run illustrations:sync
```

### Illustration color styles (as-needed basis)

- [Illustration light styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6)
- [Figma Illustration dark styles](https://www.figma.com/file/etJaiHq7aFlJFICLKIrcK7/%F0%9F%8C%9A--Illustration-Dark-Styles?t=NAycPBCIl5jp15ou-6)

```shell
yarn nx run illustrations:sync-light-styles
```

```shell
yarn nx run illustrations:sync-dark-styles
```

The CDS Illustration color styles should not change often and can be run on an as-needed basis.

### Gotchas

It is important to note that if an illustration asset is referencing a color style which was _not_ present the last time the color styles sync was run, then it will need to be run again before running the `yarn nx run illustrations:sync`.

The `illustrations:sync` command requires a `lightModeManifestFile` and `darkModeManifestFile` as inputs in project.json when generating the svg assets on the fly. If those files are stale, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.
