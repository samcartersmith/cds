import {
  ProgressBarWithFloatLabelProps,
  ProgressBarFloatLabelProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { css, cx } from 'linaria';
import React, { memo, useLayoutEffect, useRef } from 'react';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { VStack } from '../layout';
import { useDimensions } from '../hooks/useDimensions';
import { isRtl } from '../utils/isRtl';
import { Animated } from '../animation/Animated';
import { ProgressTextLabel } from './ProgressTextLabel';
import * as progressBarStyles from './progressBarStyles';

const floatingTextContainerClassName = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const ProgressBarFloatLabel = memo(({ label, disabled, progress }: ProgressBarFloatLabelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
    usePreviousValues<number>([0]);

  addPreviousPercent(progress);
  const previousPercent = getPreviousPercent() ?? 0;

  // the animation uses a pixel translate which is outdated on a window resize, we have to account for this
  const { width: cWidth, height: cHeight } = useDimensions({
    ref: containerRef,
    debounceMs: 400,
    shouldSetInitialState: true,
  });

  const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

  useLayoutEffect(() => {
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

      textContainerRef.current.style.transformOrigin = isRtl() ? 'left' : 'right';

      Animated.timing(textContainerRef, {
        property: 'transform',
        fromValue: `translateX(${startLeftTranslate}px)`,
        toValue: `translateX(${endLeftTranslate}px)`,
        ...animateProgressBaseSpec,
      })?.start();

      textContainerRef.current.style.transform = `translateX(${endLeftTranslate}px)`;
    }
  }, [progress, cWidth, cHeight, previousPercent]);

  return (
    <div
      ref={containerRef}
      data-testid="cds-progress-label-container"
      className={cx(progressBarStyles.labelContainer)}
    >
      <div
        className={floatingTextContainerClassName}
        data-testid="cds-progress-bar-float-label"
        ref={textContainerRef}
      >
        <ProgressTextLabel
          value={labelNum}
          renderLabel={renderLabel}
          disabled={disabled}
          color="foregroundMuted"
        />
      </div>
    </div>
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
