import React, { memo, useCallback, useMemo } from 'react';
import { MotionDuration } from '@cbhq/cds-common2';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import { durations } from '@cbhq/cds-common2/motion/tokens';

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
    const accessibilityState = useMemo(() => ({ disabled: !!disabled }), [disabled]);

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
              accessibilityState={accessibilityState}
              align="end"
              color={color ?? 'fg'}
              disabled={disabled}
              font="label2"
            >
              {textValue}
            </Text>
          );
        }

        return textValue;
      },
      [color, disabled, accessibilityState, renderLabel],
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
