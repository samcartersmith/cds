import React, { forwardRef, memo } from 'react';

import { Icon } from '../icons';

import { Chip } from './Chip';
import { InputChipProps } from './ChipProps';

export const InputChip = memo(
  forwardRef(function InputChip(
    { accessibilityLabel = 'input-chip', value, testID, ...props }: InputChipProps,
    ref: React.Ref<HTMLElement>,
  ) {
    const generatedA11yLabel =
      accessibilityLabel ?? typeof value === 'string' ? `Remove ${value}` : 'Remove option';
    return (
      <Chip
        ref={ref}
        inverted
        accessibilityLabel={generatedA11yLabel}
        end={
          <Icon
            color="foreground"
            name="close"
            size="s"
            testID={testID ? `${testID}-close-icon` : 'input-chip-close-icon'}
          />
        }
        {...props}
      >
        {value}
      </Chip>
    );
  }),
);
