import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useSpectrum } from '@cbhq/cds-common';
import {
  animateInputBorderInConfig,
  animateInputBorderOutConfig,
} from '@cbhq/cds-common/src/animation/border';
import { InputVariant } from '@cbhq/cds-common/src/types/InputBaseProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { paletteAliasToRgbaString } from '../utils/palette';

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
  const spectrum = useSpectrum();
  const focusedBorderOpacity = useRef(new Animated.Value(0)).current;

  const fromVariantRgbaString = paletteAliasToRgbaString(fromVariant, spectrum);
  const toVariantRgbaString = paletteAliasToRgbaString(toVariant, spectrum);

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
