# Coinbase Design System - Lottie Files

[Design System Doc website (latest)](https://cds.cbhq.net/) (go/cds)

## Get Started

Install package with `yarn add @cds/lottie-files`

- `import { tradeStatus } from '@cds/lottie-files/tradeStatus'` for mobile to prevent bundling all assets on build
- `import { tradeStatus } from '@cds/lottie-files'` for web if your project supports treeshaking

### Inside mono/repo

- Use import convention above

### 🚧 Outside mono/repo (WIP)

Make sure `@cds:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cds/lottie
```
