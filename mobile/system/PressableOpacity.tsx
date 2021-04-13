import React from 'react';

import { Pressable, PressableInternalProps } from './Pressable';

export type PressableOpacityProps = Omit<PressableInternalProps, 'backgroundColor'>;

export const PressableOpacity = ({ children, ...props }: PressableOpacityProps) => {
  return (
    <Pressable {...props} backgroundColor="transparent">
      {children}
    </Pressable>
  );
};
