import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInputBorderInConfig,
  animateInputBorderOutConfig,
} from '@cbhq/cds-common/animation/border';
import { InputVariant } from '@cbhq/cds-common/types/InputBaseProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';

import { usePalette } from './usePalette';

type InputBorderAnimationReturnType = {
  animateInputBorderIn: Animated.CompositeAnimation;
  animateInputBorderOut: Animated.CompositeAnimation;
  focusedBorderOpacity: Animated.Value;
  focusedBorderRgba: string;
  unFocusedBorderRgba: string;
};

// Animating opacity of 2nd Layer Input Border.
// This is the focused border styling
const borderInConfig = convertMotionConfig(animateInputBorderInConfig);
const borderOutConfig = convertMotionConfig(animateInputBorderOutConfig);

export const useInputBorderAnimation = (
  fromVariant: InputVariant,
  toVariant: InputVariant,
): InputBorderAnimationReturnType => {
  const palette = usePalette();
  const focusedBorderOpacity = useRef(new Animated.Value(0)).current;

  const fromVariantRgbaString = palette[fromVariant];
  const toVariantRgbaString = palette[toVariant];

  return useMemo(() => {
    return {
      animateInputBorderIn: Animated.timing(focusedBorderOpacity, borderInConfig),
      animateInputBorderOut: Animated.timing(focusedBorderOpacity, borderOutConfig),
      focusedBorderRgba: toVariantRgbaString,
      unFocusedBorderRgba: fromVariantRgbaString,
      focusedBorderOpacity,
    };
  }, [focusedBorderOpacity, fromVariantRgbaString, toVariantRgbaString]);
};
