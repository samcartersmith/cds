# Component composition

## Visibility

Component visibility should never be controlled via props. Instead, components and children should be rendered conditionally with the exception of component that can control their own visibility. These components should be controlled by default, but also be able to be rendered in an uncontrolled manner.

### Do

```jsx
visible ? <Component /> : null;
```

### Don't

```jsx
<Component visible={false} />
```

### Components that control their own visibility

#### Controlled

```jsx
const [visible, { toggleOn, toggleOff }] = useToggler(false);

<Modal visible={visible}>{children}</Modal>;
```

#### Uncontrolled

```jsx
const [visible, { toggleOn, toggleOff }] = useToggler(false);

{
  visible && <Modal visible>{children}</Modal>;
}
```

## Rendering other components via props

When composing multiple components together where one component renders the other via a prop:

1. If the other component is free form then it should be rendered as `children`.
2. If the primary component renders the other component with a specialized layout or placement, it should be passed as a prop, eg: `start`, `intermediary`, `end`.
3. If the other component is specialized (eg: shares Context) then the prop should be strongly typed.
