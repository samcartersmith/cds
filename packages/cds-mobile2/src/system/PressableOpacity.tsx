import React from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

/** @deprecated This component will be removed in a future version. Use `<Pressable background="transparent">` instead. */
export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

/** @deprecated This component will be removed in a future version. Use `<Pressable background="transparent">` instead. */
export const PressableOpacity = ({ children, ...props }: PressableOpacityProps) => {
  return (
    <Pressable {...props} background="transparent" borderColor="transparent">
      {children}
    </Pressable>
  );
};
