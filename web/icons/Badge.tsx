import React from 'react';

import { useBadge, BadgeBaseProps } from '@cbhq/cds-common/hooks/useBadge';

import { Box, BoxProps } from '../layout';
import { TextCaption } from '../typography';

export interface BadgeProps extends BadgeBaseProps, BoxProps {}

export const Badge = ({ value, variant, ...boxProps }: BadgeProps) => {
  const { badgeVariant, badgeContent, badgeStyles } = useBadge(value, variant);

  return badgeVariant === 'empty' ? null : (
    <Box {...badgeStyles} {...boxProps}>
      {badgeVariant !== 'dot' && (
        <TextCaption as="span" color="negativeForeground">
          {badgeContent}
        </TextCaption>
      )}
    </Box>
  );
};
