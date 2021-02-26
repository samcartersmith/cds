# Coinbase Design System - Web

[Design System Doc website (latest)](https://cds.cbhq.net/) (go/cds)

[Design System Storybook (master)](https://cds-storybook.cbhq.net/?path=/docs/) (go/cds-story)

## Get Started

CDS has two integration paths depending on whether your client is in this `mono/repo`.

### Inside mono/repo

Import the code directly using the path alias `@cbhq/cds-web` defined in the root `tsconfig.json`. Use root imports only.

```tsx
import { TextDisplay1 } from '@cbhq/cds-web';
```

### 🚧 Outside mono/repo (WIP)

Make sure `@coinbase:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cbhq/cds-web
```

You can start using CDS-web like so. CDS only supports ES modules currently. If your project doesn't, please reach out to the CDS team about it in #ask-cds.

```tsx
import '@cbhq/cds-web/globalStyles'
import { ThemeProvider, TextDisplay1 } from '@cbhq/cds-web';

const App = () => {
  <ThemeProvider scale="large">
    <TextDisplay1 as="h1">DeFi</TextDisplay1>
  </ThemeProvider>;
};
```
