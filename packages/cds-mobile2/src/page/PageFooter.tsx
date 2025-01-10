import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { pageFooterHeight } from '@cbhq/cds-common2/tokens/page';
import { PageFooterBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';

import { Box } from '../layout/Box';

export const PageFooter = memo(
  forwardRef(function PageFooter(
    { action, ...props }: PageFooterBaseProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <Box
        ref={ref}
        accessibilityRole="toolbar"
        alignItems="center"
        height={pageFooterHeight}
        paddingX={3}
        paddingY={1.5}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
