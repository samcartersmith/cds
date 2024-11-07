import React, { memo } from 'react';
import { I18nManager } from 'react-native';
import { CellAccessoryProps } from '@cbhq/cds-common';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';

export type { CellAccessoryProps };

export const CellAccessory = memo(function CellAccessory({ type, ...props }: CellAccessoryProps) {
  let icon;

  if (type === 'more') {
    icon = <Icon color="foregroundMuted" name="more" size="s" />;
  }

  if (type === 'arrow') {
    icon = (
      <Icon
        color="foregroundMuted"
        name={I18nManager.isRTL ? 'caretLeft' : 'caretRight'}
        size="s"
      />
    );
  }

  if (type === 'selected') {
    icon = <Icon color="primary" name="checkmark" size="s" />;
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
