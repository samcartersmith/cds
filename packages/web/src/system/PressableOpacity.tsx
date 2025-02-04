import React, { forwardRef } from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

/** @deprecated Will be removed in Q1 2025. Use `<Pressable background="transparent">` instead. */
export const PressableOpacity = forwardRef(
  ({ children, ...props }: PressableOpacityProps, ref: React.ForwardedRef<HTMLElement>) => {
    return (
      <Pressable ref={ref} {...props} background="transparent">
        {children}
      </Pressable>
    );
  },
);
