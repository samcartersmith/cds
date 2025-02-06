import React, { memo, useCallback } from 'react';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import { durations } from '@cbhq/cds-common2/motion/tokens';
import { MotionDuration } from '@cbhq/cds-common2/types';
import { ProgressTextLabelProps } from '@cbhq/cds-common2/types/ProgressBarBaseProps';

import { Text } from '../typography/Text';

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
            <Text
              noWrap
              tabularNumbers
              as="span"
              color={color ?? 'fg'}
              disabled={disabled}
              font="label2"
              textAlign="end"
            >
              {textValue}
            </Text>
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
