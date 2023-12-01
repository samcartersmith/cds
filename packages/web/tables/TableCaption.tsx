import React, { memo, useMemo } from 'react';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';

import { useResponsiveCellSpacingStyles } from '../hooks/useResponsiveCellSpacing';
import { Box } from '../layout';
import { responsiveClassName } from '../styles/responsive';
import { palette } from '../tokens';
import { TextTitle3 } from '../typography';
import { cx } from '../utils/linaria';

import { useTableCellSpacing } from './hooks/useTable';
import { TableCaptionProps } from './types/tableCaptionTypes';

export type { TableCaptionProps } from './types/tableCaptionTypes';

export const TableCaption = memo(
  ({
    children,
    as = 'span',
    align = 'start',
    color,
    backgroundColor,
    outerSpacing,
    innerSpacing,
    outerPadding,
    innerPadding,
    responsiveConfig,
    testID,
    ...rest
  }: TableCaptionProps) => {
    const { outer, inner } = useTableCellSpacing({
      outer: outerSpacing || outerPadding,
      inner: innerSpacing || innerPadding,
      skipAsValidation: true,
    });

    const { outer: outerCaptionSpacing, inner: innerCaptionSpacing } = useCellSpacing({
      outerPadding: outer,
      innerPadding: inner,
    });

    const { responsiveInnerPadding, responsiveOuterPadding } =
      useResponsiveCellSpacingStyles(responsiveConfig);

    const inlineStyles = useMemo(
      () => ({
        color: color && palette[color],
        backgroundColor: backgroundColor && palette[backgroundColor],
      }),
      [backgroundColor, color],
    );

    return (
      <caption data-testid={testID} style={inlineStyles} {...rest}>
        <Box
          {...outerCaptionSpacing}
          dangerouslySetClassName={cx(
            responsiveOuterPadding,
            responsiveConfig && responsiveClassName,
          )}
        >
          <Box
            alignContent="stretch"
            flexDirection="column"
            flexGrow={1}
            {...innerCaptionSpacing}
            dangerouslySetClassName={cx(
              responsiveInnerPadding,
              responsiveConfig && responsiveClassName,
            )}
          >
            {typeof children === 'string' ? (
              <TextTitle3 align={align} as={as} color="currentColor">
                {children}
              </TextTitle3>
            ) : (
              children
            )}
          </Box>
        </Box>
      </caption>
    );
  },
);

TableCaption.displayName = 'TableCaption';
