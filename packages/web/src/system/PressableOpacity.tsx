import React, { forwardRef } from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

export const PressableOpacity = forwardRef(
  ({ children, ...props }: PressableOpacityProps, ref: React.ForwardedRef<HTMLElement>) => {
    return (
      <Pressable ref={ref} {...props} background="transparent">
        {children}
      </Pressable>
    );
  },
);
