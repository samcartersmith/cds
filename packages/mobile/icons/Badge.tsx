import React from 'react';
import { BadgeBaseProps, useBadge } from '@cbhq/cds-common/hooks/useBadge';

import { Box, BoxProps } from '../layout';
import { TextCaption } from '../typography';

export type BadgeProps = BadgeBaseProps & BoxProps;

export const Badge = ({ value, variant, ...boxProps }: BadgeProps) => {
  const { badgeVariant, badgeContent, badgeStyles } = useBadge(value);

  return badgeVariant === 'empty' ? null : (
    <Box {...badgeStyles} {...boxProps}>
      {variant !== 'dot' && <TextCaption color="negativeForeground">{badgeContent}</TextCaption>}
    </Box>
  );
};
