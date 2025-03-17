import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { pageHeaderHeight } from '@cbhq/cds-common2/tokens/page';
import type { PageHeaderBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';

import type { Polymorphic } from '../core/polymorphism';
import { Box } from '../layout/Box';
import { type GridDefaulElement, type GridProps, Grid } from '../layout/Grid';
import { media } from '../styles/media';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';
import { Text } from '../typography/Text';

const gridStylesMobileTitleClassName = css`
  @media only screen and ${media.phone} {
    grid-column: 1 / 4; // Span all three columns
    grid-row: 2;
  }
`;

const gridStylesMobileEndClassName = css`
  @media only screen and ${media.phone} {
    grid-row: 1;
    grid-column: 3;
  }
`;

export const pageHeaderStartPaddingStart: ResponsiveProps<StaticStyleProps>['paddingStart'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;

export const pageHeaderEndPaddingX: ResponsiveProps<StaticStyleProps>['paddingX'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;

export type PageHeaderProps = Polymorphic.ExtendableProps<
  GridProps<GridDefaulElement>,
  PageHeaderBaseProps
>;

export const PageHeader = memo(
  forwardRef(function PageHeader(
    {
      start,
      end,
      title,
      overflow = 'auto',
      role = 'banner',
      templateColumns = 'auto 1fr auto',
      ...props
    }: PageHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    const titleResponsivePaddingLeft: ResponsiveProps<StaticStyleProps>['paddingStart'] = useMemo(
      () => ({
        phone: start && !end ? 0 : 3,
        tablet: start ? 0 : 4,
        desktop: start ? 0 : 4,
      }),
      [start, end],
    );

    return (
      /**
       * We use CSS grid to move the `title` element to a second row when necessary. Large screen sizes will
       * always use a single row. For smaller screen sizes, a single row is used when only two of `start`,
       * `title`, and `end` props are provided - and a second row is used when all three are provided.
       *
       *  [Single row variations] - For larger screen sizes, and smaller screen sizes when only two of `start`,
       *                            `title`, and `end` props are provided - everything stays on one row:
       *
       *  1. When `start` is present and `end` is absent, `title` is placed next to `start`.
       *    +-------+-------------------------+
       *    | Start | Title                   |
       *    +-------+-------------------------+
       *
       *  2. When `end` is present and `start` is absent, title is placed next to `end`.
       *    +----------------+----------------+
       *    | Title          |            End |
       *    +----------------+----------------+
       *
       *  3. When neither `start` nor `end` is present.
       *    +---------------------------------+
       *    | Title                           |
       *    +---------------------------------+
       *
       *   4. Large screen sizes when `start`, `title`, and `end` are present.
       *    +-------+-------------------+-----+
       *    | Start | Title             | End |
       *    +-------+-------------------+-----+
       *
       *  [Double row variation] - For smaller screen sizes - if `start`, `end`, and `title` are present, `title`
       *                           moves to the second row:
       *    +----------------+-----------------+
       *    | Start          |             End |
       *    +----------------+-----------------+
       *    | Title                            |
       *    +----------------------------------+
       *
       *
       *
       * */
      <Grid ref={ref} overflow={overflow} role={role} templateColumns={templateColumns} {...props}>
        {!!start && (
          <Box
            alignItems="center"
            height={pageHeaderHeight}
            paddingEnd={3}
            paddingStart={pageHeaderStartPaddingStart}
          >
            {start}
          </Box>
        )}
        {!!title && (
          <Box
            alignItems="center"
            className={start && end ? gridStylesMobileTitleClassName : undefined}
            justifyContent="flex-start"
            paddingStart={titleResponsivePaddingLeft}
            testID="responsive-title-container"
          >
            {typeof title === 'string' ? (
              <Text as="h1" font="title1">
                {title}
              </Text>
            ) : (
              title
            )}
          </Box>
        )}
        {!!end && (
          <Box
            alignItems="center"
            className={gridStylesMobileEndClassName}
            height={pageHeaderHeight}
            justifyContent="flex-end"
            paddingX={pageHeaderEndPaddingX}
            testID="responsive-end-container"
          >
            {end}
          </Box>
        )}
      </Grid>
    );
  }),
);
