import React, { forwardRef, memo, useMemo } from 'react';
import { GridColumnBaseProps } from '@cbhq/cds-common/types';

import { useResponsiveConfig } from '../hooks/useResponsiveConfig';
import { gap as gapStyles } from '../styles/gap';
import { colEnd as colEndStyles, colStart as colStartStyles } from '../styles/grid';
import { responsiveClassName } from '../styles/responsive';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';

export type GridColumnProps<As extends BoxElement = 'div'> = {
  /** The semantic element your component will render as. Is necessary for accessibility support and assistive technologies. */
  as?: As;
} & GridColumnBaseProps &
  Pick<BoxProps, 'role' | 'overflow' | 'opacity' | 'className' | 'style' | 'tabIndex' | 'display'> &
  React.AriaAttributes &
  React.DOMAttributes<Element>;

export const GridColumn = memo(
  forwardRef(function GridColumn<As extends BoxElement = 'div'>(
    {
      children,
      responsiveConfig,
      style,
      className,
      gap,
      gridColumn,
      colSpan,
      colStart = 'auto',
      colEnd = 'auto',
      ...props
    }: GridColumnProps<As>,
    forwardedRef: React.ForwardedRef<HTMLElement>,
  ) {
    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);

    const styles = useMemo(
      () => ({
        ...style,
        ...(colSpan && { gridColumn: `${colStart} / span ${colSpan}` }),
        ...(gridColumn && { gridColumn }),
      }),
      [colSpan, colStart, style, gridColumn],
    );

    return (
      <Box
        ref={forwardedRef}
        className={cx(
          gap && gapStyles[gap],
          responsiveConfig && responsiveClassName,
          responsiveStyleClassNames,
          colStartStyles[`colStart-${colStart}`],
          colEndStyles[`colEnd-${colEnd}`],
          className,
        )}
        style={styles}
        {...props}
      >
        {children}
      </Box>
    );
  }),
);

GridColumn.displayName = 'GridColumn';
