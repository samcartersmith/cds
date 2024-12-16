/**
 * Prior art:
 * https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/70361
 */

export namespace Polymorphic {
  export type PropsOf<
    Component extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
  > = React.JSX.LibraryManagedAttributes<Component, React.ComponentPropsWithoutRef<Component>>;

  export type ExtendableProps<BaseProps, OverrideProps> = OverrideProps &
    Omit<BaseProps, keyof OverrideProps>;

  export type InheritableElementProps<Component extends React.ElementType, Props> = ExtendableProps<
    React.ComponentPropsWithoutRef<Component>,
    Props
  >;

  export type Ref<AsComponent extends React.ElementType> =
    React.ComponentPropsWithRef<AsComponent>['ref'];

  export type Props<AsComponent extends React.ElementType, Props> = InheritableElementProps<
    AsComponent,
    Props & { as?: AsComponent } & { ref?: Ref<AsComponent> }
  >;

  export type ReactReturn = ReturnType<React.ExoticComponent>;

  export type ReactNamed = {
    [k in keyof React.NamedExoticComponent]: React.NamedExoticComponent[k];
  };
}
