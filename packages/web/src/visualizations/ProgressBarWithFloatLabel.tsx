import React, { memo, useCallback, useRef } from 'react';
import { css } from '@linaria/core';
import { m as motion, MotionStyle, useAnimation } from 'framer-motion';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import {
  ProgressBarFloatLabelProps,
  ProgressBarWithFloatLabelProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';
import { isStorybook } from '@cbhq/cds-utils';

import { useDimensions } from '../hooks/useDimensions';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { Box, VStack } from '../layout';
import { convertTransition } from '../motion/utils';
import { isRtl } from '../utils/isRtl';

import { ProgressTextLabel } from './ProgressTextLabel';

const floatingTextContainerClassName = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const motionStyle: MotionStyle = { originX: isRtl() ? 'left' : 'right' };

const ProgressBarFloatLabel = memo(
  ({ label, disabled, progress, labelPlacement }: ProgressBarFloatLabelProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
      usePreviousValues<number>([0]);
    const animationControls = useAnimation();

    addPreviousPercent(progress);
    const previousPercent = getPreviousPercent() ?? 0;

    // the animation uses a pixel translate which is outdated on a window resize, we have to account for this
    const { observe, width: cWidth, height: cHeight } = useDimensions();

    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useIsoEffect(() => {
      if (textContainerRef.current && containerRef.current && cHeight > 0 && cWidth > 0) {
        const containerWidth = containerRef.current.offsetWidth;
        const textContainerWidth = textContainerRef.current.offsetWidth;

        const startLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * previousPercent,
            )
          : Math.max(0, containerWidth * previousPercent - textContainerWidth);
        const endLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * progress,
            )
          : Math.max(0, containerWidth * progress - textContainerWidth);

        void animationControls.start({
          x: [startLeftTranslate, endLeftTranslate],
          transition: convertTransition(animateProgressBaseSpec),
        });
      }
    }, [progress, cWidth, cHeight, previousPercent]);

    const setupContainerRef = useCallback(
      (ref: HTMLDivElement) => {
        containerRef.current = ref;
        observe(ref);
      },
      [observe],
    );

    return (
      <Box
        ref={setupContainerRef}
        alignItems="center"
        spacingBottom={labelPlacement === 'above' ? 1 : 0}
        spacingTop={labelPlacement === 'below' ? 1 : 0}
        testID="cds-progress-label-container"
        width="100%"
      >
        <motion.div
          ref={textContainerRef}
          animate={animationControls}
          className={floatingTextContainerClassName}
          data-testid="cds-progress-bar-float-label"
          style={motionStyle}
        >
          <ProgressTextLabel
            color="foregroundMuted"
            disabled={disabled}
            renderLabel={renderLabel}
            value={labelNum}
          />
        </motion.div>
      </Box>
    );
  },
);

export const ProgressBarWithFloatLabel: React.FC<
  React.PropsWithChildren<ProgressBarWithFloatLabelProps>
> = memo(({ label, labelPlacement = 'above', progress, disabled, children, testID }) => {
  const skipLabel = isStorybook();
  const progressBarFloatLabel = !skipLabel && (
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
