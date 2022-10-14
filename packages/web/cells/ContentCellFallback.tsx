import React, { memo } from 'react';
import type { ContentCellFallbackProps } from '@cbhq/cds-common/types';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Box } from '../layout/Box';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import { MediaFallback } from './MediaFallback';

export type { ContentCellFallbackProps };

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
  disableRandomRectWidth,
  rectWidthVariant,
}: ContentCellFallbackProps) {
  // We can't use ContentCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  return (
    <Cell media={media && <MediaFallback type={media} />}>
      <div style={{ width: '100%' }}>
        {meta && (
          <div style={{ float: 'right', width: '30%' }}>
            <Box justifyContent="flex-end" flexShrink={0}>
              <Fallback
                height={18}
                width={50}
                disableRandomRectWidth={disableRandomRectWidth}
                rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
                percentage
              />
            </Box>
          </div>
        )}

        {title && (
          <Fallback
            height={18}
            width={45}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            percentage
          />
        )}
        {subtitle && (
          <Fallback
            height={16}
            width={35}
            spacingTop={0.5}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            percentage
          />
        )}
        {description && (
          <Fallback
            height={24}
            width={65}
            spacingTop={0.5}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            percentage
          />
        )}
      </div>
    </Cell>
  );
});
