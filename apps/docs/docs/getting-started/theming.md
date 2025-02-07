---
id: theming
title: Theming
---

# Theming

The Coinbase Design System (CDS) provides a powerful and flexible theming system that ensures a consistent look and feel across applications. By using the `ThemeProvider`, you can customize and manage theme variables globally, enabling dynamic theming, brand alignment, and support for features like light and dark modes.

## What is a Theme?

A theme in CDS is a collection of variables that define the visual design of an application. These variables include:

- **Colors**: Define text, background, and accent colors.
- **Typography**: Control font sizes, weights, and line heights.
- **Spacing**: Set padding, margins, and gaps.
- **Other Styles**: Configure borders, shadows, z-indexes, and more.

CDS uses these variables to style components consistently across web and mobile platforms.

## The ThemeProvider

The `ThemeProvider` is the foundation of theming in CDS. It:

- Provides the theme to all components within its context.
- Dynamically updates the theme when changes are made.
- Inserts CSS Variables (web) or React Context (React Native) to manage styles efficiently.

### Setting Up the ThemeProvider

Wrap your application with the `ThemeProvider` at the root level:

#### Web

```tsx
import { ThemeProvider } from '@cbhq/cds-web';

<ThemeProvider>
  <App />
</ThemeProvider>;
```

#### React Native

```tsx
import { ThemeProvider } from '@cbhq/cds-mobile';

<ThemeProvider>
  <App />
</ThemeProvider>;
```

## Default Theme

CDS provides a default theme out of the box, which includes a carefully curated set of variables:

### Colors

```tsx
const defaultColors = {
  backgroundPrimary: 'rgb(255, 255, 255)',
  backgroundSecondary: 'rgb(245, 245, 245)',
  textPrimary: 'rgb(0, 0, 0)',
  textSecondary: 'rgb(102, 102, 102)',
  accentPrimary: 'rgb(0, 122, 255)',
};
```

### Spacing

```tsx
const defaultSpacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '16px',
  4: '24px',
};
```

### Typography

```tsx
const defaultTypography = {
  fontSizeBody: '16px',
  fontSizeCaption: '14px',
  fontWeightRegular: '400',
  fontWeightBold: '700',
};
```

## Customizing the Theme

You can override the default theme by providing a custom theme to the `ThemeProvider`:

```tsx
const customTheme = {
  color: {
    backgroundPrimary: '#000000',
    textPrimary: '#FFFFFF',
    accentPrimary: '#FF5733',
  },
  space: {
    0: '0px',
    1: '8px',
    2: '16px',
  },
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

## Dynamic Theming

Dynamic theming allows your application to switch between themes at runtime. This is particularly useful for implementing light and dark mode:

### Example: Light and Dark Mode

```tsx
const lightTheme = {
  color: {
    backgroundPrimary: '#FFFFFF',
    textPrimary: '#000000',
  },
};

const darkTheme = {
  color: {
    backgroundPrimary: '#000000',
    textPrimary: '#FFFFFF',
  },
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>Toggle Theme</button>
      <YourComponents />
    </ThemeProvider>
  );
};
```

## Accessing Theme Variables

### Web

Use CSS Variables directly in your custom styles:

```css
.my-class {
  background-color: var(--color-bgPrimary);
  padding: var(--space-4);
}
```

### React Native

Access theme variables through the `useTheme` hook:

```tsx
import { useTheme } from '@cbhq/cds-mobile';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.color.bgPrimary }}>
      <Text style={{ color: theme.color.fgPrimary }}>Hello, Theming!</Text>
    </View>
  );
};
```

## Best Practices

- **Use the `ThemeProvider`**: Ensure your application is wrapped with the `ThemeProvider` to enable theming.
- **Prefer Theme Variables**: Use theme variables for styles to maintain consistency and support dynamic theming.
- **Test Multiple Themes**: Validate your application with light and dark themes to ensure proper functionality.

## Next Steps

- [Styling](#): Learn how to style components with `StyleProps` and responsive design.
- [Component Library](#): Explore the full set of components available in CDS.
- [API Overview](#): Understand the core APIs provided by CDS.

Leverage the power of theming in the Coinbase Design System to create visually consistent and customizable applications!
