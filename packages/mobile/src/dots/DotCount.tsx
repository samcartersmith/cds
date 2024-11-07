import React, { memo, useEffect, useMemo, useState } from 'react';
import { LayoutRectangle, View, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@cbhq/cds-common/motion/dot';
import {
  dotCountContent,
  dotCountSize,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';

import { DotPinStylesKey, useDotPinStyles } from '../hooks/useDotPinStyles';
import { usePalette } from '../hooks/usePalette';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';
import { TextCaption } from '../typography/TextCaption';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

const [opacityEnter, opacityExit, scaleEnter, scaleExit] = convertMotionConfigs([
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
]);

const dotTextPaddingHorizontal = 6;

export const DotCount = memo(
  ({ children, pin, variant = 'negative', count, max, overlap, ...props }: DotCountBaseProps) => {
    const palette = usePalette();
    const [childrenSize, onChildrenLayout] = useDotsLayout();
    const transforms = useDotPinStyles(
      childrenSize,
      { width: dotCountSize + dotTextPaddingHorizontal, height: dotCountSize } as LayoutRectangle,
      overlap,
    );

    const opacityAnimatedValue = useSharedValue(opacityEnter.fromValue);
    const scaleAnimatedValue = useSharedValue(scaleEnter.fromValue);
    const [shouldUnmount, setShouldUnmount] = useState(count === 0);
    const [countInternal, setCountInternal] = useState(count);
    const prevCount = usePreviousValue<number>(count);

    const pinStyles: ViewStyle = useMemo(() => {
      if (pin && transforms !== null) {
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
        dotCountContent,
        dotOuterContainerStyles,
        {
          backgroundColor: palette[variant],
          borderColor: palette.secondary,
        },
      ];
    }, [palette, variant]);

    // avoid displaying 0 during animations and preserve exit animation
    useEffect(() => {
      if (count !== 0) {
        setCountInternal(count);
      }
    }, [count]);

    useAnimatedReaction(
      () => count,
      (result) => {
        // play enter animation
        if ((prevCount === 0 || prevCount === undefined) && result > 0) {
          runOnJS(setShouldUnmount)(false);
          opacityAnimatedValue.value = withMotionTiming(opacityEnter);
          scaleAnimatedValue.value = withMotionTiming(scaleEnter);
        }

        // play exit animation
        if (prevCount && prevCount > 0 && result === 0) {
          opacityAnimatedValue.value = withMotionTiming(opacityExit, () => {
            runOnJS(setShouldUnmount)(true);
          });
          scaleAnimatedValue.value = withMotionTiming(scaleExit);
        }
      },
      [count, childrenSize],
    );

    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: Number(opacityAnimatedValue.value),
        transform: [{ scale: Number(scaleAnimatedValue.value) }],
      };
    });

    const dotCountInnerContainerStyle = useMemo(
      () => [innerContainerStyles, animatedStyles],
      [innerContainerStyles, animatedStyles],
    );

    // only check childrenSize when children is defined
    const shouldShow = children !== undefined ? childrenSize !== null : true;

    return (
      <View {...props}>
        <View onLayout={onChildrenLayout} testID={`${props.testID}-children`}>
          {children}
        </View>
        {!shouldUnmount && shouldShow && (
          <View style={pinStyles}>
            <Animated.View style={dotCountInnerContainerStyle} testID="dotcount-inner-container">
              <TextCaption
                color="primaryForeground"
                style={{ paddingHorizontal: dotTextPaddingHorizontal }}
              >
                {parseDotCountMaxOverflow(countInternal, max)}
              </TextCaption>
            </Animated.View>
          </View>
        )}
      </View>
    );
  },
);
