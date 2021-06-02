import React, { memo } from 'react';

import type { ListCellFallbackProps } from '@cbhq/cds-common/types';

import { Box } from '../layout/Box';
import { Fallback } from '../layout/Fallback';
import { Cell } from './Cell';
import { MediaFallback } from './MediaFallback';

export type { ListCellFallbackProps };

export const ListCellFallback = memo(function ListCellFallback({
  title,
  description,
  detail,
  subdetail,
  media,
}: ListCellFallbackProps) {
  // We cant use ListCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  return (
    <Cell
      detail={
        (detail || subdetail) && (
          <div style={{ width: '100%' }}>
            <Box
              flexDirection="column"
              alignContent="flex-end"
              alignItems="flex-end"
              justifyContent="center"
              flexShrink={0}
            >
              {detail && <Fallback height={22} width={60} percentage />}
              {subdetail && <Fallback height={22} width={50} spacingTop={0.5} percentage />}
            </Box>
          </div>
        )
      }
      media={media && <MediaFallback type={media} />}
      maxContentWidth="70%"
      maxDetailWidth="30%"
    >
      <div style={{ width: '100%' }}>
        {title && <Fallback height={22} width={65} percentage />}
        {description && <Fallback height={22} width={85} spacingTop={0.5} percentage />}
      </div>
    </Cell>
  );
});
