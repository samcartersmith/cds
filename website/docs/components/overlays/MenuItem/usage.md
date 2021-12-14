### Web Only

`MenuItem` is a Higher Order Component that injects keyboard navigation functionality, accessibility attributes, and focus behavior into its children.

It is used to wrap interactable children (eg: `SelectOption`s) of a `Select` or `PopoverMenu` to make them "smart".

We strongly recommend that you use `SelectOption` with `MenuItem` when used in a `Select` or `PopoverMenu` as it has custom styles specific to usage within a `Select`.

#### Default Composition

```jsx live
<MenuItem value={option} key={option}>
  <SelectOption title={option} description="BTC" />
</MenuItem>
```
