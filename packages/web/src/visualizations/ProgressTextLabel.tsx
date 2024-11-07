import React, { memo, useCallback } from 'react';
import { MotionDuration } from '@cbhq/cds-common';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { ProgressTextLabelProps } from '@cbhq/cds-common/types/ProgressBarBaseProps';

import { TextLabel2 } from '../typography';

import { Counter } from './Counter';

export const ProgressTextLabel = memo(
  ({ value, renderLabel, disabled, color }: ProgressTextLabelProps) => {
    const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([0]);

    addPreviousValue(value);

    const renderNum = useCallback(
      (num: number) => {
        const textValue = renderLabel ? renderLabel(num, disabled) : `${num}%`;

        // if the user supplied value returns a string use default formatting
        if (typeof textValue === 'string') {
          return (
            <TextLabel2
              noWrap
              tabularNumbers
              align="end"
              as="span"
              color={color ?? 'foreground'}
              disabled={disabled}
            >
              {textValue}
            </TextLabel2>
          );
        }

        return textValue;
      },
      [color, disabled, renderLabel],
    );
    return (
      <Counter
        durationInMillis={durations[animateProgressBaseSpec.duration as MotionDuration]}
        endNum={value}
        renderNum={renderNum}
        startNum={getPreviousValue() ?? 0}
      />
    );
  },
);
