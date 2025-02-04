import React from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

/** @deprecated Will be removed in Q1 2025. Use `<Pressable background="transparent">` instead. */
export const PressableOpacity = ({ children, ...props }: PressableOpacityProps) => {
  return (
    <Pressable {...props} background="transparent" borderColor="transparent">
      {children}
    </Pressable>
  );
};
