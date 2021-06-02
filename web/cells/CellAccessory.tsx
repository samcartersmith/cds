import React, { memo } from 'react';

import type { CellAccessoryProps } from '@cbhq/cds-common/types';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { isRtl } from '../utils/isRtl';

export type { CellAccessoryProps };

export const CellAccessory = memo(function CellAccessory({ type, ...props }: CellAccessoryProps) {
  let icon;

  if (type === 'more') {
    icon = <Icon name="more" size="s" color="foregroundMuted" />;
  }

  if (type === 'arrow') {
    icon = <Icon name={isRtl() ? 'caretLeft' : 'caretRight'} size="s" color="foregroundMuted" />;
  }

  if (type === 'selected') {
    icon = <Icon name="checkmark" size="s" color="primary" />;
  }

  if (!icon) {
    return null;
  }

  return (
    <Box {...props} testID="accessory">
      {icon}
    </Box>
  );
});
