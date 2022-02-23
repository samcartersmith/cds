import {
  animateDotOpacityConfig,
  animateDotScaleConfig,
  dotHidden,
  dotVisible,
} from '@cbhq/cds-common/animation/dot';
import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { convertMotionConfig } from '../../animation/convertMotionConfig';

// opacity animation
const opacityInConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotVisible,
  fromValue: dotHidden,
});
const opacityOutConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotHidden,
  fromValue: dotVisible,
});

// Y transform animation
const scaleInConfig = convertMotionConfig({
  ...animateDotScaleConfig,
  toValue: dotVisible,
  fromValue: dotHidden,
});
const scaleOutConfig = convertMotionConfig({
  ...animateDotScaleConfig,
  toValue: dotHidden,
  fromValue: dotVisible,
});

export const useDotAnimation = () => {
  const opacity = useRef(new Animated.Value(dotHidden)).current;
  const scale = useRef(new Animated.Value(dotHidden)).current;

  const animateIn = useCallback(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityInConfig),
      Animated.timing(scale, scaleInConfig),
    ]).start();
  }, [opacity, scale]);

  const animateOut = useCallback(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityOutConfig),
      Animated.timing(scale, scaleOutConfig),
    ]).start();
  }, [opacity, scale]);

  return {
    opacity,
    scale,
    animateIn,
    animateOut,
  };
};
