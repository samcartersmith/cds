import React, { useEffect, useMemo, useRef } from 'react';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { HStack, VStack } from '@cbhq/cds-mobile/layout';
import { PressableOpacity, ThemeProvider } from '@cbhq/cds-mobile/system';

import { TextBody } from '@cbhq/cds-mobile/typography';
import { FiatIcon, TextIcon } from '@cbhq/cds-mobile/icons';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { convertMotionConfig } from '@cbhq/cds-mobile/animation/convertMotionConfig';
import { Animated } from 'react-native';
import { createIconSheet, CreateIconSheetParams } from ':cds-storybook/stories/IconSheet';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const animateInConfig = convertMotionConfig({
  curve: 'enterFunctional',
  duration: 'moderate1',
  toValue: 1,
  useNativeDriver: false,
});
const animateOutConfig = convertMotionConfig({
  curve: 'exitFunctional',
  duration: 'moderate1',
  toValue: 0,
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

export const { IconSheet } = createIconSheet({
  Icon,
  HStack,
  ThemeProvider,
} as CreateIconSheetParams);

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
    <ExamplesScreen>
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
        </HStack>
      </Example>
      <Example title="Animated Icon">
        <PressableOpacity onPress={toggle} noScaleOnPress>
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
    </ExamplesScreen>
  );
};

export default IconScreen;
