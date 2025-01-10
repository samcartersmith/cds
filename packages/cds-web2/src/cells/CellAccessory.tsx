import React, { forwardRef, memo } from 'react';
import type { CellAccessoryProps as CellAccessoryCommonProps } from '@cbhq/cds-common2/types/CellBaseProps';

import { Icon } from '../icons/Icon';
import { type BoxProps, Box } from '../layout/Box';
import { isRtl } from '../utils/isRtl';

export const cellAccessoryTestId = 'accessory';

export type CellAccessoryProps = CellAccessoryCommonProps & BoxProps<'div'>;

export const CellAccessory = memo(
  forwardRef(function CellAccessory(
    { type, ...props }: CellAccessoryProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    let icon;

    if (type === 'more') {
      icon = <Icon color="iconForegroundMuted" name="more" size="s" />;
    }

    if (type === 'arrow') {
      icon = (
        <Icon color="iconForegroundMuted" name={isRtl() ? 'caretLeft' : 'caretRight'} size="s" />
      );
    }

    if (type === 'selected') {
      icon = <Icon color="iconPrimary" name="checkmark" size="s" />;
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
