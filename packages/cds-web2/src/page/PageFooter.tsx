import React, { forwardRef, memo } from 'react';
import { pageFooterHeight } from '@cbhq/cds-common2/tokens/page';
import type { PageFooterBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';

import type { Polymorphic } from '../core/polymorphism';
import { type BoxProps, Box } from '../layout/Box';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';

export const pageFooterPaddingX: ResponsiveProps<StaticStyleProps>['paddingX'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;
export const pageFooterJustifyContent: ResponsiveProps<StaticStyleProps>['justifyContent'] = {
  phone: 'center',
  tablet: 'flex-end',
  desktop: 'flex-end',
} as const;
export type PageFooterProps = Polymorphic.ExtendableProps<BoxProps<'div'>, PageFooterBaseProps>;
export const PageFooter = memo(
  forwardRef(function PageFooter(
    {
      action,
      height = pageFooterHeight,
      justifyContent = pageFooterJustifyContent,
      paddingX = pageFooterPaddingX,
      paddingY = 1.5,
      role = 'contentinfo',
      ...props
    }: PageFooterProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <Box
        ref={ref}
        height={height}
        justifyContent={justifyContent}
        paddingX={paddingX}
        paddingY={paddingY}
        role={role}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
