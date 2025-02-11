---
id: styling
title: Styling
---

# Styling

Styling with the Coinbase Design System (CDS) is designed to be intuitive, efficient, and consistent. CDS provides a flexible styling API that leverages both CSS Variables (for web) and dynamic React Context-based theming (for React Native). This document covers the key styling concepts and tools available in CDS.

## Core Styling Principles

CDS styling is built on the following principles:

- **Consistency**: Use shared theme variables to ensure uniform styling across components and platforms.
- **Performance**: Utilize CSS Variables on the web to minimize re-renders and enhance performance.
- **Flexibility**: Support for dynamic and responsive styles out of the box.

## Theming

Theming is a central feature of CDS. The `ThemeProvider` component is required to inject theme variables and manage theming across your application.

### Web Theming

- **CSS Variables**: CDS components use CSS Variables to style elements efficiently.
- **Dynamic Updates**: Switching themes (e.g., light and dark mode) dynamically updates styles.

Example:

```tsx
import { ThemeProvider } from '@cbhq/cds-web';

<ThemeProvider>
  <App />
</ThemeProvider>;
```

### React Native Theming

- **React Context**: In React Native, CDS uses a theme Context to broadcast theme values.
- **Dynamic Styling**: Access theme variables via the `useTheme` hook.

Example:

```tsx
import { ThemeProvider } from '@cbhq/cds-mobile';

<ThemeProvider>
  <App />
</ThemeProvider>;
```

## StyleProps API

The `StyleProps` API is a powerful feature of CDS, allowing you to apply styles directly to components without writing custom CSS or stylesheets.

### Static and Dynamic Props

CDS distinguishes between static and dynamic style props:

- **Static Props**: Map directly to predefined class names for optimal performance.
- **Dynamic Props**: Apply inline styles using CSS Variables (web) or the `StyleSheet` API (React Native).

Example:

```tsx
<Box color="bgPrimary" padding={4} margin={{ base: 2, minTablet: 4 }} width="100%" />
```

### Responsive Design

CDS makes it easy to create responsive designs by supporting breakpoint-based styles in the `StyleProps` API.

Example:

```tsx
<Box
  padding={{ base: 2, minTablet: 4, minDesktop: 6 }}
  width={{ base: '100%', minDesktop: '50%' }}
/>
```

This eliminates the need for custom media queries in CSS.

### Polymorphic Components

CDS components like `Box` and `Text` are polymorphic, meaning they can render different underlying elements using the `as` prop.

Example:

```tsx
<Text as="h1" fontSize="display1">
  Welcome to CDS
</Text>
```

## Theme Variables

CDS exposes a robust set of theme variables that you can use to style components. These include:

- **Colors**: `color.bgPrimary`, `color.fgPrimary`, etc.
- **Spacing**: `space.0`, `space.1`, etc.
- **Typography**: `fontSize.body`, `lineHeight.body`, etc.

### Using Theme Variables

#### Web

Access theme variables directly using CSS Variables:

```css
.my-class {
  background-color: var(--color-bgPrimary);
  padding: var(--space-4);
}
```

#### React Native

Use the `useTheme` hook to retrieve theme values:

```tsx
import { useTheme } from '@cbhq/cds-mobile';

const MyComponent = () => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.color.bgPrimary, padding: theme.space[4] }}>
      <Text>Styled with CDS</Text>
    </View>
  );
};
```

## Customizing Themes

You can customize the default CDS theme by providing your own values to the `ThemeProvider`.

Example:

```tsx
const customTheme = {
  color: {
    bgPrimary: '#000000',
    fgPrimary: '#FFFFFF',
  },
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
  },
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

## Inline Styles and Class Names

In addition to `StyleProps`, CDS components support `className` (web) and `style` (web and React Native) props for advanced customization.

### Web

```tsx
<Box className="custom-class" style={{ backgroundColor: 'red' }} />
```

### React Native

```tsx
<Box style={{ backgroundColor: 'blue' }} />
```

## Best Practices

- **Use `StyleProps`**: Leverage the built-in `StyleProps` API for consistent and responsive designs.
- **Minimize Inline Styles**: Prefer theme variables and `StyleProps` over inline styles for performance and maintainability.
- **Customize Themes**: Tailor the CDS theme to align with your brand's design language.

## Next Steps

- [API Overview](#): Learn about the core APIs in CDS.
- [Component Library](#): Explore the available components and their styling options.
- [Theming Guide](#): Dive deeper into theming with CDS.

Harness the power of the Coinbase Design System to create visually stunning and highly performant applications!
