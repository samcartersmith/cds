---
id: api-overview
title: API Overview
---

# API Overview

The Coinbase Design System (CDS) provides a robust set of APIs to streamline development and create consistent, accessible, and high-performance applications. This page provides an overview of the key APIs and concepts in CDS to help you get started.

## Core Concepts

### Components

CDS offers a comprehensive library of React and React Native components. These components are designed to:

- Be customizable via props and theming.
- Ensure consistency with Coinbase's design language.
- Adhere to accessibility standards.

### Theming

Theming is at the core of CDS. The `ThemeProvider` broadcasts a theme throughout your application, enabling:

- Global style consistency.
- Customization of colors, spacing, typography, and more.
- Light and dark mode support.

#### Web

For web applications, theming is achieved through CSS Variables and React Context. CSS Variables minimize JavaScript-driven re-renders, offering optimal performance.

#### React Native

In React Native, theming is achieved through React Context, providing dynamic styles at runtime.

### StyleProps

CDS components support a powerful `StyleProps` API that simplifies applying styles. This API:

- Supports responsive design out of the box.
- Includes dynamic and static style properties.
- Reduces the need for custom CSS or inline styles.

Example:

```tsx
<Box
  color="backgroundPrimary"
  padding={{ base: 3, minTablet: 5 }}
  width={{ base: '100%', minDesktop: '50%' }}
/>
```

### Polymorphic Components

Many CDS components are polymorphic, meaning they can render different HTML elements or React Native views based on the `as` prop. This flexibility allows developers to tailor components to specific use cases while maintaining consistent styles and behavior.

Example:

```tsx
<Box as="section" padding={4}>
  Content here
</Box>
```

### Responsive Design

CDS supports responsive design with a declarative syntax. You can specify different styles for various breakpoints directly in your components without writing media queries manually.

Example:

```tsx
<Grid
  templateColumns={{ base: '1fr', minTablet: 'repeat(2, 1fr)' }}
  gap={{ base: 2, minDesktop: 4 }}
>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Grid>
```

## Component API

Each CDS component includes:

- **Props API**: Define how the component behaves and interacts with the rest of the UI.
- **StyleProps API**: Customize the component's appearance with responsive styles.

### Common Props

Most CDS components support the following common props:

- `className` (web only): Pass custom class names for additional styling.
- `style`: Apply inline styles.
- `id`: Set a unique identifier for the component.
- `data-*`: Add custom data attributes for testing or analytics.

### Component-Specific Props

Each component has its own set of specific props. Refer to the individual component documentation for detailed information about its API.

Example:

```tsx
<Button variant="primary" size="large" onClick={() => console.log('Button clicked')}>
  Click Me
</Button>
```

## Dynamic Styling with Theme Variables

CDS exposes theme variables that allow you to create custom styles based on the current theme. These variables include:

- Colors (`color.fgPrimary`, `color.bgPrimary`, etc.)
- Spacing (`space.0`, `space.1`, etc.)
- Typography (`fontSize.body`, `lineHeight.body`, etc.)
- And more.

For web, use CSS Variables directly:

```css
.my-class {
  background-color: var(--color-bgPrimary);
}
```

For React Native, access them through the theme context:

```tsx
import { useTheme } from '@cbhq/cds-mobile';

const MyComponent = () => {
  const theme = useTheme();
  return <View style={{ backgroundColor: theme.color.backgroundPrimary }}>{/* Content */}</View>;
};
```

## Accessibility API

CDS components are designed with accessibility in mind. Key features include:

- ARIA attributes to support screen readers.
- Focus management for interactive components (e.g., `Modal`, `Dropdown`).
- Keyboard navigation support.

Developers can further enhance accessibility by:

- Providing descriptive labels (e.g., `aria-label`, `aria-labelledby`).
- Testing with accessibility tools.

Example:

```tsx
<Button aria-label="Submit form">Submit</Button>
```

## Integration with Third-Party Libraries

CDS components integrate seamlessly with third-party libraries, such as:

- **React Router**: Use `NavLink` and `Link` for navigation.
- **Redux or Context**: Manage state alongside CDS components.
- **Analytics Tools**: Add `data-*` attributes to components for tracking user interactions.

## Next Steps

- [Component Library](#): Explore all the components available in CDS.
- [Theming](#): Learn how to customize your application's theme.
- [StyleProps Guide](#): Dive deeper into the powerful StyleProps API.

Unlock the full potential of the Coinbase Design System and start building high-quality applications today!
