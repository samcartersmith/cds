import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { ResponsiveProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { pageHeaderHeight } from '@cbhq/cds-common/tokens/page';
import { PageHeaderBaseProps } from '@cbhq/cds-common/types/PageBaseProps';

import { Box } from '../layout/Box';
import { deviceMqs } from '../layout/breakpoints';
import { Grid } from '../layout/Grid';
import { TextTitle1 } from '../typography/TextTitle1';

const gridStylesMobileTitleClassName = css`
  @media only screen and (${deviceMqs.phoneLandscape}) {
    grid-column: 1 / 4; // Span all three columns
    grid-row: 2;
  }
`;

const gridStylesMobileEndClassName = css`
  @media only screen and (${deviceMqs.phoneLandscape}) {
    grid-row: 1;
    grid-column: 3;
  }
`;

const startResponsiveConfig: ResponsiveProps = {
  phone: {
    spacingStart: 3,
  },
  tablet: {
    spacingStart: 4,
  },
  desktop: {
    spacingStart: 4,
  },
};

const endResponsiveConfig: ResponsiveProps = {
  phone: {
    spacingHorizontal: 3,
  },
  tablet: {
    spacingHorizontal: 4,
  },
  desktop: {
    spacingHorizontal: 4,
  },
};

export const PageHeader = memo(
  forwardRef(function PageHeader(
    { start, end, title, ...props }: PageHeaderBaseProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) {
    const headerHeight = useScaleConditional(pageHeaderHeight);

    const titleResponsiveConfig: ResponsiveProps = useMemo(
      () => ({
        phone: {
          spacingStart: start && !end ? 0 : 3,
        },
        tablet: {
          spacingStart: start ? 0 : 4,
        },
        desktop: {
          spacingStart: start ? 0 : 4,
        },
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
      <Grid ref={ref} overflow="auto" role="banner" templateColumns="auto 1fr auto" {...props}>
        {!!start && (
          <Box
            alignItems="center"
            height={headerHeight}
            responsiveConfig={startResponsiveConfig}
            spacingEnd={3}
          >
            {start}
          </Box>
        )}
        {!!title && (
          <Box
            alignItems="center"
            className={start && end ? gridStylesMobileTitleClassName : undefined}
            justifyContent="flex-start"
            responsiveConfig={titleResponsiveConfig}
            testID="responsive-title-container"
          >
            {typeof title === 'string' ? <TextTitle1 as="h1">{title}</TextTitle1> : title}
          </Box>
        )}
        {!!end && (
          <Box
            alignItems="center"
            className={gridStylesMobileEndClassName}
            height={headerHeight}
            justifyContent="flex-end"
            responsiveConfig={endResponsiveConfig}
            testID="responsive-end-container"
          >
            {end}
          </Box>
        )}
      </Grid>
    );
  }),
);
