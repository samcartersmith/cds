import React from 'react';

import { PressableProps, ViewStyle } from 'react-native';

import { HapticFeedbackType } from '../types';
import { PressableHighlight } from './PressableHighlight';

export interface PressableOpacityProps extends Omit<PressableProps, 'style'> {
  activeOpacity?: number;
  dangerouslySetStyle?: ViewStyle;
  feedback?: HapticFeedbackType;
}

export const PressableOpacity = (props: PressableOpacityProps) => {
  return <PressableHighlight {...props} underlayColor={false} />;
};
