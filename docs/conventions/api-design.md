# API Design

When we design our component API's we should strive to make them as intuitive and inferable as possible.

## Guiding Principles of API Design

- Clear > Clever
- Explicit > Implicit
- Simple > Complex
- Flexible > Rigid
- Consistent > Inconsistent

### Do

- Name your props in a way that they are self documenting, eg: `horizontal` and `vertical` instead of `direction`. When creating API's consider long-term scalability: could this boolean prop have multiple values in the future? If so, the prop name should be indicative of the user's intent (`direction`) not implementation. If the prop is a boolean, it should be named after the non-default value.

```tsx
// Don't do this
enum Variants {
  Primary,
  Secondary,
};

// Do this instead
type Variant = 'primary' | 'secondary';

// Don't do this
<Button secondary />

// Do this instead
<Button variant="secondary" />
```

#### Further Reading

- [Props as a component's API](https://docs.cbhq.net/frontend/standards-and-conventions/react/props-as-a-components-api)

### Don't

- Use acronyms, abbreviations, or shorthand for prop names
- Use open ended types for props (eg: `any`, `object`, `string`) and instead prefer specific types. Strings should only be used for text content.

Casting creates a read-only tuple type where each element's type corresponds to the exact value at that position in the array.

```ts
const position = ['relative', 'absolute', 'fixed'] as const;
type Position = (typeof position)[number];
```

#### Further Reading

- ([How to avoid the boolean trap](https://spicefactory.co/blog/2019/03/26/how-to-avoid-the-boolean-trap-when-designing-react-components/))

# API Design Conventions

The following are API Design conventions that have been adopted by the team and enforced through linting rules throughout our library. If you want to contribute a convention, refer to [go/cds-eng-convention-process](https://docs.google.com/document/d/1Y_VWrbgfbDAMFG2zc8MGO3bybWsl2LzP8_Wq9KtTJAs/edit?usp=sharing).

## Type naming

### boolean

- Prop name should be indicative of the “non-default value”, eg: if the default state is enabled, surface a prop for disabled
- Use past tense adjectives, single word, with the exception of temporary states (eg: active and loading). Never use [auxiliary verbs](https://github.com/atomiks/tippyjs-react/issues/76).
  - **Correct**: `disabled`
  - **Incorrect**: `isDisabled`

#### Examples

- Style props (eg: `bordered`, `focusable`, `multiline`)
- Input states (eg: `disabled`, `active`, `focused`)
- Feature flags (eg: `fontMigration`). Feature flag names should be the non default value, eliminating the use of enabled and disabled suffixes.

### numeric

Use a prefix `number` or suffix `count` or `index`, eg: `numberOfLines` or `itemIndex`.

**Example**

```jsx
<Element numberOfLines={3} />
```

### array

Use plural nouns `items` `elements` `nodes` `children` `rows` `columns`

**Example**

```jsx
<Element rows={rows} />
```

### Unions

Use singular naming. Prefer casting from `const` or unions whenever possible over using strings or booleans.

```tsx
const position = ['relative', 'absolute', 'fixed'] as const;
type Position = (typeof position)[number];

// or use a union, but prefer casting from const
type Position = 'relative' | 'absolute' | 'fixed';
```

### Event handlers

- Naming should be clearly indicative of the user's action and be useful in any context, eg: `onClose` instead of `onExit`.
- Prefix event handlers with `on`, eg: `onPress`, `onFocus`, `onBlur`.
- Prefer naming that is platform agnostic, whenever possible. Eg: `onPress` instead of `onClick` or `onTap`.
- Event handlers for subcomponents (interactables in a parent component) should be named indicative of their purpose, eg: `onActionPress` rather than `onFooterButtonPress`.

## Lifecycle Methods

Lifecycle methods are callbacks fired at different stages of a component's lifecycle. Lifecycle stages are limited to those that are possible with `React.useEffect`:

| Method     | Description                                    |
| ---------- | ---------------------------------------------- |
| onOpen     | Callback fired after the component is opened.  |
| onWillOpen | Callback fired before the component is closed. |
| onDidClose | Callback fired after the component is closed.  |

## Styles

- Style props should mirror those of CSS specs as closely as possible.
- Boolean style props should be past tense and singular, eg: `bordered`.

## Visibility

### Components that can be opened/closed

These components have the ability to control their visibility internally and should be used in a controlled manner.

- Components should be _controlled_ by default, with optional ability to render it in an _uncontrolled_ manner.
- Visibility should be controlled using the `visible` prop.

#### Controlled :heavy_check_mark:

```jsx
const [visible, { toggleOn, toggleOff }] = useToggler(false);

<Modal visible={visible}>{children}</Modal>;
```

#### Uncontrolled :x:

```jsx
const [visible, { toggleOn, toggleOff }] = useToggler(false);

{
  visible && <Modal visible>{children}</Modal>;
}
```

### All other components

- Should be conditionally rendered and uncontrolled.

```tsx
visible ? <Button>Submit</Button> : null;
```

#### Accessibility

If a component's visibility is controlled by another component, use the
`useA11yControlledVisibility` hook which will add accessibility props to
both the trigger and the controlled component.

```jsx
const accessibilityLabel = 'open-menu-button';
const [visible, { toggleOn, toggleOff }] = useToggler(false);
const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
  useA11yControlledVisibility(visible, accessibilityLabel);

<Trigger {...triggerAccessibilityProps}>Click me!</Trigger>;
{
  visible && (
    <PopoverMenu {...controlledElementAccessibilityProps}>My visibility is controlled</PopoverMenu>
  );
}
```
