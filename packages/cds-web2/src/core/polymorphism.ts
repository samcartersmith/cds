/* eslint-disable @typescript-eslint/ban-types */
// Sourced from https://www.benmvp.com/blog/polymorphic-react-components-typescript/ and tweaked for React 19

/**
 * A more precise version of just React.ComponentPropsWithoutRef on its own.
 *
 * Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
 */
export type PropsOf<
  Component extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
> = React.JSX.LibraryManagedAttributes<Component, React.ComponentPropsWithoutRef<Component>>;

type AsProp<AsComponent extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: AsComponent;
};

/**
 * Allows for extending a set of props (`BaseProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<BaseProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<BaseProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`Component`) must be passed in.
 */
export type InheritableElementProps<
  Component extends React.ElementType,
  Props = {},
> = ExtendableProps<PropsOf<Component>, Props>;

export type PolymorphicRef<AsComponent extends React.ElementType> =
  React.ComponentPropsWithRef<AsComponent>['ref'];

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included.
 *
 * @example
 * To create polymorphic components with the `PolymorphicProps` generic type:
 *```tsx
 * type MyComponentBaseProps = { message?: string }
 * type MyComponentProps<AsComponent extends React.ElementType> =
 *   PolymorphicProps<AsComponent, MyComponentBaseProps>
 * export const MyComponent = <
 *   AsComponent extends React.ElementType = 'button'
 * >({
 *   message,
 *   ...props
 * }: MyComponentProps<AsComponent>) => {
 *   return <button ref={ref} {...props}>{message}</button>
 * }
 *```
 */
export type PolymorphicProps<
  AsComponent extends React.ElementType,
  Props = {},
> = InheritableElementProps<
  AsComponent,
  Props & AsProp<AsComponent> & { ref?: PolymorphicRef<AsComponent> }
>;
