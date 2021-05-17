# CDS - <package>

<description>

## Getting Started

CDS has two integration paths depending on whether your client is in this `mono/repo`.

### Inside mono/repo

Import the code directly using the path alias `@cbhq/cds-<package>` defined in the root `tsconfig.json`. Use deep imports only.

### Outside mono/repo

- Install package with `yarn add @cbhq/cds-<package>`
- Make sure `@cbhq:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cbhq/cds-<package>
```
