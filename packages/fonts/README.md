# CDS - Fonts

Official font package for the Coinbase Design System, providing Coinbase's custom typefaces for web and mobile applications.

## Installation

```bash
yarn add @cbhq/cds-fonts
```

## Usage

### Web Applications

1. **Import the coinbaseTheme:**

   ```typescript
   import { coinbaseTheme } from '@cbhq/cds-web/themes/coinbaseTheme';
   ```

2. **Pass the coinbaseTheme to your root ThemeProvider:**

   ```tsx
   import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
   import { coinbaseTheme } from '@cbhq/cds-web/themes/coinbaseTheme';

   function App() {
     return <ThemeProvider theme={coinbaseTheme}>{/* Your app content */}</ThemeProvider>;
   }
   ```

3. **Import the font styles before the CDS globalStyles:**

   ```typescript
   import '@cbhq/cds-fonts/fonts.css';
   import '@cbhq/cds-web/globalStyles';
   ```

### CSS Custom Properties

Once imported, the following CSS custom properties are available:

```css
--cds-font-display: CoinbaseDisplay, var(--cds-font-fallback);
--cds-font-sans: CoinbaseSans, var(--cds-font-fallback);
--cds-font-text: CoinbaseText, var(--cds-font-fallback);
--cds-font-mono: CoinbaseMono, var(--cds-font-fallback);
--cds-font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
```

### Direct CSS Usage

You can also use the font families directly in your CSS:

```css
.heading {
  font-family: var(--cds-font-display);
}

.body-text {
  font-family: var(--cds-font-text);
}

.code {
  font-family: var(--cds-font-mono);
}
```

## Mobile/Native Applications

For React Native applications, the package also includes `.otf` font files in the `native/` directory that can be used for mobile app development.

1. **Import the coinbaseTheme:**

   ```typescript
   import { coinbaseTheme } from '@cbhq/cds-mobile/themes/coinbaseTheme';
   ```

2. **Pass the coinbaseTheme to your root ThemeProvider:**

   ```tsx
   import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
   import { coinbaseTheme } from '@cbhq/cds-mobile/themes/coinbaseTheme';

   function App() {
     return <ThemeProvider theme={coinbaseTheme}>{/* Your app content */}</ThemeProvider>;
   }
   ```

## Browser Support

The fonts are provided in WOFF2 format, which is supported by all modern browsers. Fallback fonts are automatically applied for unsupported browsers.

## Performance

All fonts use `font-display: swap` for optimal loading performance, ensuring text remains visible during font load.
