import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { useTheme } from '../../system';
import { PressableOpacity } from '../../system/PressableOpacity';
import { TextBody } from '../../typography';
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
  const theme = useTheme();
  const [isToggled, { toggle }] = useToggler();
  const animationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationRef, isToggled ? animateInConfig : animateOutConfig).start();
  }, [isToggled, animationRef]);

  const animatedIcon = (
    <Icon
      animated
      dangerouslySetColor={animationRef.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.color.line, theme.color.iconPrimary],
      })}
      name="starActive"
      size="l"
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
      <Example title="Animated Icon">
        <PressableOpacity
          noScaleOnPress
          accessibilityHint="hit star to rate the product"
          accessibilityLabel="rating a product"
          onPress={toggle}
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
