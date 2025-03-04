import React, { forwardRef, memo } from 'react';
import type { CellAccessoryProps as CellAccessoryCommonProps } from '@cbhq/cds-common2/types/CellBaseProps';

import { Icon } from '../icons/Icon';
import { type BoxDefaultElement, type BoxProps, Box } from '../layout/Box';
import { isRtl } from '../utils/isRtl';

export const cellAccessoryTestId = 'accessory';

export type CellAccessoryProps = CellAccessoryCommonProps & BoxProps<BoxDefaultElement>;

export const CellAccessory = memo(
  forwardRef(function CellAccessory(
    { type, ...props }: CellAccessoryProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    let icon;

    if (type === 'more') {
      icon = <Icon color="fgMuted" name="more" size="s" />;
    }

    if (type === 'arrow') {
      icon = <Icon color="fgMuted" name={isRtl() ? 'caretLeft' : 'caretRight'} size="s" />;
    }

    if (type === 'selected') {
      icon = <Icon color="fgPrimary" name="checkmark" size="s" />;
    }

    if (!icon) {
      return null;
    }

    return (
      <Box {...props} ref={ref} testID={cellAccessoryTestId}>
        {icon}
      </Box>
    );
  }),
);
