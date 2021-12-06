import { useMemo, useRef } from 'react';
import { InputVariant } from '@cbhq/cds-common/types/InputBaseProps';
import { Animated } from 'react-native';
import {
  animateInputBorderInConfig,
  animateInputBorderOutConfig,
} from '@cbhq/cds-common/animation/border';
import { widthFocused, widthUnfocused } from '@cbhq/cds-common/tokens/input';
import { useSpectrum } from '@cbhq/cds-common';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import { paletteAliasToRgbaString } from '../utils/palette';

type InputBorderAnimationReturnType = {
  animateInputBorderIn: Animated.CompositeAnimation;
  animateInputBorderOut: Animated.CompositeAnimation;
  interpolatedValues: {
    borderColor: Animated.AnimatedInterpolation;
    borderWidth: Animated.AnimatedInterpolation;
    margin: Animated.AnimatedInterpolation;
  };
};

// border variant animation
const borderInConfig = convertMotionConfig({
  ...animateInputBorderInConfig,
  useNativeDriver: false,
});
const borderOutConfig = convertMotionConfig({
  ...animateInputBorderOutConfig,
  useNativeDriver: false,
});

export const useInputBorderAnimation = (
  fromVariant: InputVariant,
  toVariant: InputVariant,
): InputBorderAnimationReturnType => {
  const borderColor = useRef(new Animated.Value(0)).current;
  const borderWidth = useRef(new Animated.Value(0)).current;
  const margin = useRef(new Animated.Value(0)).current;
  const spectrum = useSpectrum();

  const fromVariantRgbaString = paletteAliasToRgbaString(fromVariant, spectrum);
  const toVariantRgbaString = paletteAliasToRgbaString(toVariant, spectrum);

  return useMemo(() => {
    return {
      animateInputBorderIn: Animated.parallel([
        Animated.timing(borderColor, borderInConfig),
        Animated.timing(borderWidth, borderInConfig),
        Animated.timing(margin, borderInConfig),
      ]),
      animateInputBorderOut: Animated.parallel([
        Animated.timing(borderColor, borderOutConfig),
        Animated.timing(borderWidth, borderOutConfig),
        Animated.timing(margin, borderOutConfig),
      ]),
      interpolatedValues: {
        borderColor: borderColor.interpolate({
          inputRange: [0, 1],
          outputRange: [fromVariantRgbaString, toVariantRgbaString],
        }),
        borderWidth: borderWidth.interpolate({
          inputRange: [0, 1],
          outputRange: [widthUnfocused, widthFocused],
        }),
        margin: borderWidth.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(widthFocused / 2)],
        }),
      },
    };
  }, [margin, borderColor, borderWidth, fromVariantRgbaString, toVariantRgbaString]);
};
