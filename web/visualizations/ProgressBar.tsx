import React, { memo, useEffect, useRef } from 'react';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { ProgressBaseProps } from '@cbhq/cds-common/types/ProgressBaseProps';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { isRtl } from '../utils/isRtl';
import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';
import { Animated } from '../animation/Animated';

export const ProgressBar: React.FC<ProgressBaseProps> = memo(
  ({
    weight = 'normal',
    progress,
    color = 'primary',
    disabled = false,
    testID,
  }: ProgressBaseProps) => {
    const height = useProgressSize(weight);

    const palette = usePalette();
    const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
      usePreviousValues<number>([0]);

    addPreviousPercent(progress);
    const previousPercent = getPreviousPercent() ?? 0;

    const innerBarRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (innerBarRef.current) {
        innerBarRef.current.style.transformOrigin = isRtl() ? 'right' : 'left';

        Animated.timing(innerBarRef, {
          property: 'transform',
          fromValue: `scaleX(${previousPercent})`,
          toValue: `scaleX(${progress})`,
          ...animateProgressBaseSpec,
        })?.start();

        innerBarRef.current.style.width = '100%';
        innerBarRef.current.style.transform = `scaleX(${progress})`;
      }
    }, [previousPercent, progress]);

    return (
      <VStack spacingVertical={1} flexGrow={1} flexShrink={0} testID={testID} height={height}>
        <HStack alignItems="center">
          <Box
            testID="cds-progress-bar-inner-bar-container"
            justifyContent={isRtl() ? 'flex-end' : 'flex-start'}
            alignItems="center"
            flexGrow={1}
            flexShrink={1}
            height={height}
            dangerouslySetBackground={palette.line}
            borderRadius="standard"
            overflow="hidden"
          >
            <Box
              ref={innerBarRef}
              testID="cds-progress-bar-inner-bar"
              alignItems="center"
              justifyContent="flex-start"
              height={height}
              flexShrink={0}
              flexGrow={0}
              width="0%"
              dangerouslySetBackground={!disabled ? palette[color] : palette.lineHeavy}
            />
          </Box>
        </HStack>
      </VStack>
    );
  },
);
