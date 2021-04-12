import React from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<
  PressableInternalProps,
  'backgroundColor' | 'hideUnderlay'
>;

export const PressableOpacity = ({ children, ...props }: PressableOpacityProps) => {
  return (
    <Pressable {...props} backgroundColor="background" hideUnderlay>
      {children}
    </Pressable>
  );
};
