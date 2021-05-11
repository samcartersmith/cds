import React, { memo } from 'react';

import { Fallback } from '../layout';
import { useTypographyStyles } from '../typography';
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
  const lineHeight = {
    headline: useTypographyStyles('headline').lineHeight,
    body: useTypographyStyles('body').lineHeight,
    label2: useTypographyStyles('label2').lineHeight,
  };

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
