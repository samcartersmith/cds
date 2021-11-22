import React, { forwardRef, ForwardedRef } from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

export const PressableOpacity = forwardRef(
  ({ children, ...props }: PressableOpacityProps, ref: ForwardedRef<HTMLElement>) => {
    return (
      <Pressable ref={ref} {...props} backgroundColor="transparent">
        {children}
      </Pressable>
    );
  },
);
