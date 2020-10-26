# Coinbase Design System - Web

[Design System Storybook (master)](https://cds-web-storybook.cbhq.net/master/index.html?path=/docs/)

## Get Started

CDS has two integration paths depending on whether your client is in this `mono/repo`.

### Inside mono/repo

Import the code directly using the path alias `@cb/design-system-web` defined in the root `tsconfig.json`.

```tsx
import { TextDisplay1 } from '@cb/design-system-web';
```

### 🚧 Outside mono/repo (WIP)

Make sure `@coinbase:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cb/design-system-web
```

You can start using CDS-web like so.

```tsx
import { TextDisplay1 } from '@cb/design-system-web';
```

If your project supports using es modules, then the package should tree shake properly by default.

## Team

If you have any questions about using CDS-web, feel free to contact @hannah-jin.
