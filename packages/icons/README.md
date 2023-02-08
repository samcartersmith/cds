# @cbhq/cds-icons

CDS icons used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-icons
```

## Contributing

### Figma links

- [CDS Icon Figma components](https://www.figma.com/file/tuc9LpASTO9mBrbg1tAdAl/%E2%9D%8C-Icons?node-id=513%3A3971&t=ctB9WBiSSu6wOe3o-0)

### Commands

1. Add a .env.local file at root of repo

```
FIGMA_ACCESS_TOKEN=[access or request access to the UI Infra shared vault on 1Password for the token]
```

2. Sync latest Figma illustration components

```shell
yarn nx run icons:sync
```

3. Open PR with changes
