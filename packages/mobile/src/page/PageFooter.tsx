import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { pageFooterHeight } from '@cbhq/cds-common/tokens/page';
import { PageFooterBaseProps } from '@cbhq/cds-common/types/PageBaseProps';

import { Box } from '../layout/Box';

export const PageFooter = memo(
  forwardRef(function PageFooter(
    { action, ...props }: PageFooterBaseProps,
    ref: React.ForwardedRef<View>,
  ) {
    const footerHeight = useScaleConditional(pageFooterHeight);

    return (
      <Box
        ref={ref}
        accessibilityRole="toolbar"
        alignItems="center"
        height={footerHeight}
        spacingHorizontal={3}
        spacingVertical={1.5}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
