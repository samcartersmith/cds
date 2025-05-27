import React, { memo, useCallback } from 'react';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { MotionDuration } from '@cbhq/cds-common/types';

import { Text } from '../typography/Text';

import { Counter } from './Counter';
import type { ProgressBaseProps } from './ProgressBar';

export type ProgressTextLabelProps = Pick<ProgressBaseProps, 'disabled'> & {
  value: number;
  renderLabel?: (num: number, disabled?: boolean) => React.ReactNode;
  color?: ThemeVars.Color;
};

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
