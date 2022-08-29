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
  Pick<
    BoxProps,
    'role' | 'overflow' | 'opacity' | 'dangerouslySetClassName' | 'dangerouslySetStyle' | 'tabIndex'
  > &
  React.AriaAttributes &
  React.DOMAttributes<Element>;

export const Grid = memo(
  forwardRef(function Grid<As extends BoxElement = 'div'>(
    {
      children,
      responsiveConfig,
      columns: columnsProp,
      columnMin,
      columnMax = '1fr',
      dangerouslySetClassName,
      dangerouslySetStyle,
      gap,
      ...props
    }: GridProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);
    const columnsIsNumber = typeof columnsProp === 'number';
    const columnsIsString = typeof columnsProp === 'string';
    const columnsKey = `columns-${columnsProp}`;
    // @ts-expect-error TODO: figure this out
    const columnsClassName = columnsStyles[columnsKey] as string;
    const isImplicit = !columnsProp && !!columnMin;

    const styles = useMemo(
      () => ({
        // explicit columns as string
        ...(columnsIsString && columnsProp && { gridTemplateColumns: columnsProp }),
        // implicit columns when none are provided
        ...(isImplicit && {
          gridTemplateColumns: `repeat(auto-fill, minmax(${columnMin}, ${columnMax}))`,
        }),
        ...dangerouslySetStyle,
      }),
      [columnMax, columnMin, columnsIsString, columnsProp, dangerouslySetStyle, isImplicit],
    );

    return (
      <Box
        ref={forwardedRef}
        display="grid"
        dangerouslySetClassName={cx(
          columnsProp && columnsIsNumber && columnsClassName,
          gap && gapStyles[gap],
          responsiveConfig && responsiveClassName,
          responsiveStyleClassNames,
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

Grid.displayName = 'Grid';
