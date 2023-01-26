# @cbhq/cds-illustrations

CDS illustrations used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-illustrations
```

## Contributing

### Figma links

- [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations)
- [CDS Illustration Figma light styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6)
- [CDS Illustration Figma dark styles](https://www.figma.com/file/etJaiHq7aFlJFICLKIrcK7/%F0%9F%8C%9A--Illustration-Dark-Styles?t=NAycPBCIl5jp15ou-6)

### Commands

1. Add a .env.local file at root of repo

```
FIGMA_ACCESS_TOKEN=[access or request access to the UI Infra shared vault on 1Password for the token]
```

2. (optional) Sync latest Illustration Figma color styles if new color style was added

```shell
yarn nx run figma-styles:sync
```

3. Sync latest Figma illustration components

```shell
yarn nx run illustrations:sync
```

### Summary

The [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations) are composed of vectors which leverage the [CDS Figma Illustration light color styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6) to power their color fills. This allows design to create a single light mode version and engineering handles creating the dark mode version through the CDS Figma plugin or through code generation.

In order for engineering to be able to generate a dark mode versions of an illustration asset, we need to pull information about the light and dark mode color styles from Figma (`yarn nx run figma-styles:sync`). The CDS Illustration color styles should not change often and can be run on an as-needed basis.

### Gotchas

It is important to note that if an illustration asset is referencing a color style which was _not_ present the last time the color styles sync was run, then it will need to be run again before running the `yarn nx run illustrations:sync`.

The `illustrations:sync` command requires a `lightModeManifestFile` and `darkModeManifestFile` as inputs in project.json when generating the svg assets on the fly. If those files are stale, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.
