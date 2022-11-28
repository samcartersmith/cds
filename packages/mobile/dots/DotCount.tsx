import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@cbhq/cds-common/motion/dot';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';
import { TextCaption } from '../typography/TextCaption';

import { getTransform } from './dotStyles';

const [opacityEnter, opacityExit, scaleEnter, scaleExit] = convertMotionConfigs([
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
]);

export const DotCount = memo(
  ({ children, pin, variant = 'negative', count, overlap, ...props }: DotCountBaseProps) => {
    const palette = usePalette();
    const [childrenSize, onChildrenLayout] = useLayout();
    const [dotSize, onDotLayout] = useLayout();
    const transforms = useDotPinStyles(childrenSize, dotSize, overlap);

    const opacityAnimatedValue = useSharedValue(opacityEnter.fromValue);
    const scaleAnimatedValue = useSharedValue(scaleEnter.fromValue);
    const [shouldUnmount, setShouldUnmount] = useState(count === 0);
    const [countInternal, setCountInternal] = useState(count);

    const pinStyles: ViewStyle = useMemo(() => {
      if (pin) {
        const [vertical, horizontal] = (pin as string).split('-');

        return getTransform(
          transforms[horizontal as DotPinStylesKey],
          transforms[vertical as DotPinStylesKey],
        );
      }
      return {};
    }, [pin, transforms]);

    const innerContainerStyles = useMemo(() => {
      return [
        pinStyles,
        dotCountContent,
        dotCountPadding,
        dotOuterContainerStyles,
        {
          backgroundColor: palette[variant],
          borderColor: palette.secondary,
        },
      ];
    }, [palette, pinStyles, variant]);

    // avoid displaying 0 during animations
    useEffect(() => {
      if (count !== 0) {
        setCountInternal(count);
      }
    }, [count]);

    useAnimatedReaction(
      () => count,
      (result, prev) => {
        // play enter animation
        if ((prev === 0 || prev === null) && result > 0) {
          runOnJS(setShouldUnmount)(false);
          opacityAnimatedValue.value = withMotionTiming(opacityEnter);
          scaleAnimatedValue.value = withMotionTiming(scaleEnter);
        }

        // play exit animation
        if (prev && prev > 0 && result === 0) {
          opacityAnimatedValue.value = withMotionTiming(opacityExit, () => {
            runOnJS(setShouldUnmount)(true);
          });
          scaleAnimatedValue.value = withMotionTiming(scaleExit);
        }
      },
    );

    const animatedStyles = useAnimatedStyle(() => ({
      [opacityEnter.property]: opacityAnimatedValue.value,
      transform: [
        { scale: Number(scaleAnimatedValue.value) },
        ...(pinStyles.transform ? pinStyles.transform : []),
      ],
    }));

    return (
      <View {...props}>
        <View testID={`${props.testID}-children`} onLayout={onChildrenLayout}>
          {children}
        </View>
        {!shouldUnmount && (
          <Animated.View
            testID="dotcount-inner-container"
            onLayout={onDotLayout}
            style={[innerContainerStyles, animatedStyles]}
          >
            <TextCaption color="primaryForeground">
              {parseDotCountMaxOverflow(countInternal)}
            </TextCaption>
          </Animated.View>
        )}
      </View>
    );
  },
);
