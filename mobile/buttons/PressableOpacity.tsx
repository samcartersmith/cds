import React from 'react';

import { PressableHighlight, PressableHighlightProps } from './PressableHighlight';

export type PressableOpacityProps = Omit<
  PressableHighlightProps,
  'backgroundColor' | 'hideUnderlay'
>;

export const PressableOpacity = (props: PressableOpacityProps) => {
  return <PressableHighlight {...props} backgroundColor="background" hideUnderlay />;
};
