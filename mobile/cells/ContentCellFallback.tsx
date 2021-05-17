import React, { memo } from 'react';

import { Fallback } from '../layout';
import { useLineHeightMap } from '../typography/useLineHeightMap';
import { CellMediaType } from './CellMedia';
import { ContentCell } from './ContentCell';
import { MediaFallback } from './MediaFallback';

export interface ContentCellFallbackProps {
  /** Display description shimmer. */
  description?: boolean;
  /** Display media shimmer with a shape according to type. */
  media?: CellMediaType;
  /** Display meta shimmer. */
  meta?: boolean;
  /** Display subtitle shimmer. */
  subtitle?: boolean;
  /** Display title shimmer. */
  title?: boolean;
}

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
}: ContentCellFallbackProps) {
  const lineHeight = useLineHeightMap();

  return (
    <ContentCell
      description={
        description && <Fallback height={lineHeight.body} width={110} spacingTop={0.5} />
      }
      media={media && <MediaFallback type={media} />}
      meta={meta && <Fallback height={lineHeight.label2} width={50} />}
      title={(title || subtitle) && <Fallback height={lineHeight.label2} width={90} />}
    />
  );
});
