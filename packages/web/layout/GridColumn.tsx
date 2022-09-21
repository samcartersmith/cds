import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
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
  Pick<
    BoxProps,
    | 'role'
    | 'overflow'
    | 'opacity'
    | 'dangerouslySetClassName'
    | 'dangerouslySetStyle'
    | 'tabIndex'
    | 'display'
  > &
  React.AriaAttributes &
  React.DOMAttributes<Element>;

export const GridColumn = memo(
  forwardRef(function GridColumn<As extends BoxElement = 'div'>(
    {
      children,
      responsiveConfig,
      dangerouslySetClassName,
      dangerouslySetStyle,
      gap,
      gridColumn,
      colSpan,
      colStart = 'auto',
      colEnd = 'auto',
      ...props
    }: GridColumnProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);

    const styles = useMemo(
      () => ({
        ...dangerouslySetStyle,
        ...(colSpan && { gridColumn: `${colStart} / span ${colSpan}` }),
        ...(gridColumn && { gridColumn }),
      }),
      [colSpan, colStart, dangerouslySetStyle, gridColumn],
    );

    return (
      <Box
        ref={forwardedRef}
        dangerouslySetClassName={cx(
          gap && gapStyles[gap],
          responsiveConfig && responsiveClassName,
          responsiveStyleClassNames,
          colStartStyles[`colStart-${colStart}`],
          colEndStyles[`colEnd-${colEnd}`],
          dangerouslySetClassName,
        )}
        dangerouslySetStyle={styles}
        {...props}
      >
        {children}
      </Box>
    );
  }),
);

GridColumn.displayName = 'GridColumn';
