import React, { memo } from 'react';
import { I18nManager } from 'react-native';
import { CellAccessoryProps } from '@cbhq/cds-common';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';

export type { CellAccessoryProps };

export const CellAccessory = memo(function CellAccessory({ type, ...props }: CellAccessoryProps) {
  let icon;

  if (type === 'more') {
    icon = <Icon name="more" size="s" color="foregroundMuted" />;
  }

  if (type === 'arrow') {
    icon = (
      <Icon
        name={I18nManager.isRTL ? 'caretLeft' : 'caretRight'}
        size="s"
        color="foregroundMuted"
      />
    );
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
