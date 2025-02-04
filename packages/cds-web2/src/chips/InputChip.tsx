import React, { forwardRef, memo } from 'react';

import { Icon } from '../icons/Icon';

import { Chip } from './Chip';
import type { InputChipProps } from './ChipProps';

export const InputChip = memo(
  forwardRef<HTMLElement, InputChipProps>(function InputChip(
    { accessibilityLabel = 'input-chip', value, testID, ...props },
    ref,
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
            color="iconForeground"
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
