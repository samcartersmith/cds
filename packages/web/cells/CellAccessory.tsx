import React, { ForwardedRef, forwardRef, memo } from 'react';
import type { CellAccessoryProps } from '@cbhq/cds-common/types';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { isRtl } from '../utils/isRtl';

export type { CellAccessoryProps };

export const CellAccessory = memo(
  forwardRef(function CellAccessory(
    { type, ...props }: CellAccessoryProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    let icon;

    if (type === 'more') {
      icon = <Icon color="foregroundMuted" name="more" size="s" />;
    }

    if (type === 'arrow') {
      icon = <Icon color="foregroundMuted" name={isRtl() ? 'caretLeft' : 'caretRight'} size="s" />;
    }

    if (type === 'selected') {
      icon = <Icon color="primary" name="checkmark" size="s" />;
    }

    if (!icon) {
      return null;
    }

    return (
      <Box {...props} ref={ref} testID="accessory">
        {icon}
      </Box>
    );
  }),
);
