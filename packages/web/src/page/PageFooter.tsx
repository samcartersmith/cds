import React, { forwardRef, memo } from 'react';
import { ResponsiveProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { pageFooterHeight } from '@cbhq/cds-common/tokens/page';
import { PageFooterBaseProps } from '@cbhq/cds-common/types/PageBaseProps';

import { Box } from '../layout/Box';

const footerResponsiveConfig: ResponsiveProps = {
  phone: {
    justifyContent: 'center',
    spacingHorizontal: 3,
  },
  tablet: {
    justifyContent: 'flex-end',
    spacingHorizontal: 4,
  },
  desktop: {
    justifyContent: 'flex-end',
    spacingHorizontal: 4,
  },
};

export const PageFooter = memo(
  forwardRef(function PageFooter(
    { action, ...props }: PageFooterBaseProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) {
    const footerHeight = useScaleConditional(pageFooterHeight);

    return (
      <Box
        ref={ref}
        height={footerHeight}
        responsiveConfig={footerResponsiveConfig}
        role="contentinfo"
        spacingVertical={1.5}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
