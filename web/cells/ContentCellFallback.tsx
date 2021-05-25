import React, { memo } from 'react';

import { ContentCellFallbackProps } from '@cbhq/cds-common';

import { Box, Fallback } from '../layout';
import { Cell } from './Cell';
import { MediaFallback } from './MediaFallback';

export type { ContentCellFallbackProps };

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
}: ContentCellFallbackProps) {
  // We cant use ContentCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  return (
    <Cell media={media && <MediaFallback type={media} />} maxContentWidth="100%">
      <div style={{ width: '100%' }}>
        {meta && (
          <div style={{ float: 'right', width: '30%' }}>
            <Box justifyContent="flex-end" flexShrink={0}>
              <Fallback height={18} width={50} percentage />
            </Box>
          </div>
        )}

        {title && <Fallback height={18} width={45} percentage />}
        {subtitle && <Fallback height={16} width={35} spacingTop={0.5} percentage />}
        {description && <Fallback height={24} width={65} spacingTop={0.5} percentage />}
      </div>
    </Cell>
  );
});
