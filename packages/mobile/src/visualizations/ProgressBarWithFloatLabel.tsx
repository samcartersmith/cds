import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent } from 'react-native';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import {
  ProgressBarFloatLabelProps,
  ProgressBarWithFloatLabelProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useLayout } from '../hooks/useLayout';
import { Box, VStack } from '../layout';

import { ProgressTextLabel } from './ProgressTextLabel';

const ProgressBarFloatLabel = memo(({ label, disabled, progress }: ProgressBarFloatLabelProps) => {
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
    <Box onLayout={onLayout} testID="cds-progress-bar-float-label-container" flexWrap="nowrap">
      <Box
        flexGrow={0}
        flexShrink={0}
        testID="cds-progress-bar-float-label"
        onLayout={handleTextLayout}
        animated
        dangerouslySetStyle={progressStyle}
        alignSelf="flex-start"
      >
        <ProgressTextLabel
          value={labelNum}
          renderLabel={renderLabel}
          disabled={disabled}
          color="foregroundMuted"
        />
      </Box>
    </Box>
  );
});

export const ProgressBarWithFloatLabel: React.FC<ProgressBarWithFloatLabelProps> = memo(
  ({ label, labelPlacement = 'above', progress, disabled, children, testID }) => {
    const progressBarFloatLabel = (
      <ProgressBarFloatLabel label={label} progress={progress} disabled={disabled} />
    );

    return (
      <VStack testID={testID}>
        {labelPlacement === 'above' && progressBarFloatLabel}

        {children}

        {labelPlacement === 'below' && progressBarFloatLabel}
      </VStack>
    );
  },
);
