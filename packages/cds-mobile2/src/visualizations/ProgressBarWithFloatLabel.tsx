import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent } from 'react-native';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import {
  ProgressBarFloatLabelProps,
  ProgressBarWithFloatLabelProps,
} from '@cbhq/cds-common2/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common2/visualizations/getProgressBarLabelParts';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useLayout } from '../hooks/useLayout';
import { Box, VStack } from '../layout';

import { ProgressTextLabel } from './ProgressTextLabel';

const ProgressBarFloatLabel = memo(
  ({ label, disabled, progress, labelPlacement }: ProgressBarFloatLabelProps) => {
    const [textWidth, setTextWidth] = useState<number>(-1);
    const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
      usePreviousValues<number>([0]);
    const [size, onLayout] = useLayout();
    const containerWidth = size.width;

    addPreviousPercent(progress);
    const previousPercent = getPreviousPercent() ?? 0;

    const animatedProgress = useRef(new Animated.Value(previousPercent));

    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useEffect(() => {
      if (containerWidth > 0 && textWidth > -1) {
        Animated.timing(
          animatedProgress.current,
          convertMotionConfig({
            toValue: progress,
            ...animateProgressBaseSpec,
            useNativeDriver: true,
          }),
        )?.start();
      }
    }, [progress, animatedProgress, containerWidth, textWidth, addPreviousPercent]);

    const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
      setTextWidth(event.nativeEvent.layout.width);
    }, []);

    const progressStyle = {
      transform: [
        {
          translateX: animatedProgress.current.interpolate({
            inputRange: [0, 1],
            outputRange: [
              I18nManager.isRTL ? containerWidth - textWidth : 0,
              I18nManager.isRTL ? 0 : containerWidth - textWidth,
            ],
          }),
        },
      ],
    };

    return (
      <Box
        flexWrap="nowrap"
        onLayout={onLayout}
        paddingBottom={labelPlacement === 'above' ? 1 : 0}
        paddingTop={labelPlacement === 'below' ? 1 : 0}
        testID="cds-progress-bar-float-label-container"
      >
        <Box
          animated
          alignSelf="flex-start"
          flexGrow={0}
          flexShrink={0}
          onLayout={handleTextLayout}
          style={progressStyle}
          testID="cds-progress-bar-float-label"
        >
          <ProgressTextLabel
            color="fgMuted"
            disabled={disabled}
            renderLabel={renderLabel}
            value={labelNum}
          />
        </Box>
      </Box>
    );
  },
);

export const ProgressBarWithFloatLabel: React.FC<
  React.PropsWithChildren<ProgressBarWithFloatLabelProps>
> = memo(({ label, labelPlacement = 'above', progress, disabled, children, testID }) => {
  const progressBarFloatLabel = (
    <ProgressBarFloatLabel
      disabled={disabled}
      label={label}
      labelPlacement={labelPlacement}
      progress={progress}
    />
  );

  return (
    <VStack testID={testID}>
      {labelPlacement === 'above' && progressBarFloatLabel}

      {children}

      {labelPlacement === 'below' && progressBarFloatLabel}
    </VStack>
  );
});
