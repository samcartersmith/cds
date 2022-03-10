import React, { memo } from 'react';

import { ContentCellFallbackProps } from '@cbhq/cds-common';

import { Fallback } from '../layout';
import { useLineHeightMap } from '../typography/useLineHeightMap';
import { ContentCell } from './ContentCell';
import { MediaFallback } from './MediaFallback';

export type { ContentCellFallbackProps };

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
      media={media ? <MediaFallback type={media} /> : undefined}
      meta={meta && <Fallback height={lineHeight.label2} width={50} />}
      title={(title || subtitle) && <Fallback height={lineHeight.label2} width={90} />}
    />
  );
});
