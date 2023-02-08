import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { usePalette } from '../../hooks/usePalette';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextBody } from '../../typography';
import { FiatIcon } from '../FiatIcon';
import { Icon } from '../Icon';
import { TextIcon } from '../TextIcon';

import { IconSheet } from './IconSheet';

const animateInConfig = convertMotionConfig({
  easing: 'enterFunctional',
  duration: 'moderate1',
  toValue: 1,
  useNativeDriver: false,
});
const animateOutConfig = convertMotionConfig({
  easing: 'exitFunctional',
  duration: 'moderate1',
  toValue: 1,
  useNativeDriver: false,
});

export const useAnimation = (): [
  Animated.Value,
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const animationRef = useRef(new Animated.Value(0));
  return useMemo(() => {
    const animateIn = Animated.timing(animationRef.current, animateInConfig);
    const animateOut = Animated.timing(animationRef.current, animateOutConfig);
    return [animationRef.current, animateIn, animateOut];
  }, []);
};

const IconScreen = () => {
  const palette = usePalette();
  const [isToggled, { toggle }] = useToggler();
  const animationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationRef, isToggled ? animateInConfig : animateOutConfig).start();
  }, [isToggled, animationRef]);

  const animatedIcon = (
    <Icon
      animated
      size="l"
      name="starActive"
      dangerouslySetColor={animationRef.interpolate({
        inputRange: [0, 1],
        outputRange: [palette.line, palette.primary],
      })}
    />
  );

  return (
    <ExampleScreen>
      <Example title="Nesting icons">
        <VStack gap={1}>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>This is some text</TextBody>
          </TextBody>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>
              This is soooooooooooooome reallllllllllllllllly loooooooonnngggggg text
            </TextBody>
          </TextBody>
        </VStack>
      </Example>
      <Example title="Fiat Icons">
        <HStack gap={2}>
          <FiatIcon currencyCode="USD" />
          <FiatIcon currencyCode="EUR" />
          <FiatIcon currencyCode="GBP" />
          <FiatIcon currencyCode="JPY" />
          <FiatIcon currencyCode="BRL" />
        </HStack>
      </Example>
      <Example title="Animated Icon">
        <PressableOpacity
          accessibilityLabel="rating a product"
          accessibilityHint="hit star to rate the product"
          onPress={toggle}
          noScaleOnPress
        >
          <HStack gap={1}>
            {animatedIcon}
            {animatedIcon}
            {animatedIcon}
            {animatedIcon}
          </HStack>
        </PressableOpacity>
      </Example>
      <Example title="Icon Sheet">
        <IconSheet />
      </Example>
    </ExampleScreen>
  );
};

export default IconScreen;
