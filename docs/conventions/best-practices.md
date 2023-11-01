# Best Practices

## Memoization

Never used rest props as a dependency of memoized context values.

The rested `props` object gets regenerated every time on component re-render even if the values inside the object didn't change.
This will cause the `useMemo` or `memo` to re-run which then re-generates the context values, and eventually causes all context consumers to unnecessarily re-render.

### Do

```jsx
const Provider = memo(({ children, value1, value2 }) => {
  const contextValue = useMemo(
    () => ({
      value1,
      value2,
    }),
    [value1, value2],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
});
```

### Don't

```jsx
const Provider = memo(({ children, ...props }) => {
  const contextValue = useMemo(() => props, [props]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
});
```

### Further Reading

- [Why we memo all the things](https://docs.google.com/document/d/1TF3Dw3BKwMUw4bqanVCSWHNMGoTnjB4oiBogt9jWMes/edit)

## Code sharing between mobile and web

Shared code should live in @cbhq/cds-common. We should strive to reuse code as often as possible.

## Factory functions

Historically, we've used factory functions to generate components that are the same across multiple packages, however this is no longer an accepted convention and instead components must be implemented in each package that requires them.

## Function Ordering

Functions should be ordered in files based on usage, rather than relying on hoisting. This makes it easier to read and understand the code.

## Stories and Tests

- Storybook stories should be written for all components and live in a sibling `__stories__` directory.
- Tests should be written for all components and live in a sibling `__tests__` directory.

## Imports

- When importing from another file in the same library use a relative shallow import. This helps with tree shaking and reduces bundle size.
- When importing from another directory in the same app use module aliases.
  - **Correct**: `import { SomeFunction } from '@app/module';`
  - **Incorrect**: `import { SomeFunction } from '../../../../module';`
- Never import from an app into a different app or library.
- Always use module names when importing from a lib into a different app or library.

### Further Reading

- [Importing from other libraries](https://github.cbhq.net/eaa-eng/cms#importing-from-apps-and-libs)
