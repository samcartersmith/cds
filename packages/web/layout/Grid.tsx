import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { GridBaseProps } from '@cbhq/cds-common/types';

import { useResponsiveConfig } from '../hooks/useResponsiveConfig';
import { gap as gapStyles } from '../styles/gap';
import { columns as columnsStyles } from '../styles/grid';
import { responsiveClassName } from '../styles/responsive';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';

export type GridProps<As extends BoxElement = 'div'> = {
  /** The semantic element your component will render as. Is necessary for accessibility support and assistive technologies. */
  as?: As;
} & GridBaseProps &
  Pick<BoxProps, 'role' | 'overflow' | 'opacity' | 'className' | 'style' | 'tabIndex'> &
  React.AriaAttributes &
  React.DOMAttributes<Element>;

type ColumnKey = keyof typeof columnsStyles;

export const Grid = memo(
  forwardRef(function Grid<As extends BoxElement = 'div'>(
    {
      children,
      responsiveConfig,
      columns: columnsProp,
      templateColumns,
      columnMin,
      columnMax = '1fr',
      style,
      className,
      gap,
      ...props
    }: GridProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);
    const columnsKey: ColumnKey | undefined = columnsProp && `columns-${columnsProp}`;
    const columnsClassName = columnsKey && columnsStyles[columnsKey];
    const isImplicit = !columnsProp && !templateColumns && !!columnMin;

    const styles = useMemo(() => {
      if (templateColumns) {
        return {
          gridTemplateColumns: templateColumns,
        };
      }
      if (isImplicit) {
        return {
          gridTemplateColumns: `repeat(auto-fill, minmax(${columnMin}, ${columnMax}))`,
        };
      }
      return style;
    }, [columnMax, columnMin, style, isImplicit, templateColumns]);

    return (
      <Box
        ref={forwardedRef}
        className={cx(
          columnsProp && columnsClassName,
          gap && gapStyles[gap],
          responsiveConfig && responsiveClassName,
          responsiveStyleClassNames,
          className,
        )}
        display="grid"
        style={styles}
        {...props}
      >
        {children}
      </Box>
    );
  }),
);

Grid.displayName = 'Grid';
