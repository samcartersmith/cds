import * as React from 'react';

//  web only
export type DynamicElement<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = {
  /**
   * Choose a semantic html element or a React component to be rendered. All native html attribute
   * for that element will be available through the styled component.
   */
  readonly as: T;
} & Omit<React.ComponentProps<T>, 'className' | 'style'>;
