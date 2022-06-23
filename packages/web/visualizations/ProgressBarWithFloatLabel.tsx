import React, { memo, useCallback, useRef } from 'react';
import { m as motion, MotionStyle, useAnimation } from 'framer-motion';
import { css } from 'linaria';
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

const ProgressBarFloatLabel = memo(({ label, disabled, progress }: ProgressBarFloatLabelProps) => {
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
        ? Math.min(containerWidth - textContainerWidth, containerWidth - containerWidth * progress)
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
      alignItems="center"
      ref={setupContainerRef}
      testID="cds-progress-label-container"
      width="100%"
    >
      <motion.div
        className={floatingTextContainerClassName}
        data-testid="cds-progress-bar-float-label"
        ref={textContainerRef}
        animate={animationControls}
        style={motionStyle}
      >
        <ProgressTextLabel
          value={labelNum}
          renderLabel={renderLabel}
          disabled={disabled}
          color="foregroundMuted"
        />
      </motion.div>
    </Box>
  );
});

export const ProgressBarWithFloatLabel: React.FC<ProgressBarWithFloatLabelProps> = memo(
  ({ label, labelPlacement = 'above', progress, disabled, children, testID }) => {
    const skipLabel = isStorybook();
    const progressBarFloatLabel = !skipLabel && (
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
