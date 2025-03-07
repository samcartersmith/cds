import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { type PressableBaseProps, Pressable, pressableDefaultElement } from './Pressable';

export const pressableOpacityDefaultElement = pressableDefaultElement;

export type PressableOpacityDefaultElement = typeof pressableOpacityDefaultElement;

export type PressableOpacityBaseProps = Omit<
  PressableBaseProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

export type PressableOpacityProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  PressableOpacityBaseProps
>;

type PressableOpacityComponent = (<
  AsComponent extends React.ElementType = PressableOpacityDefaultElement,
>(
  props: PressableOpacityProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/** @deprecated Will be removed in Q1 2025. Use `<Pressable background="transparent">` instead. */
export const PressableOpacity: PressableOpacityComponent = forwardRef<
  React.ReactElement<PressableOpacityBaseProps>,
  PressableOpacityBaseProps
>(
  <AsComponent extends React.ElementType>(
    { children, as, ...props }: PressableOpacityProps<AsComponent>,
    ref: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? pressableOpacityDefaultElement) satisfies React.ElementType;
    return (
      <Pressable ref={ref} as={Component} {...props} background="transparent">
        {children}
      </Pressable>
    );
  },
);
