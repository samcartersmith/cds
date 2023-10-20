import React, { memo } from 'react';
import { ContentCellFallbackProps } from '@cbhq/cds-common';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

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
  disableRandomRectWidth,
  rectWidthVariant,
}: ContentCellFallbackProps) {
  const lineHeight = useLineHeightMap();

  return (
    <ContentCell
      description={
        description && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.body}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
            spacingTop={0.5}
            width={110}
          />
        )
      }
      media={media ? <MediaFallback type={media} /> : undefined}
      meta={
        meta && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.label2}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            width={50}
          />
        )
      }
      title={
        (title || subtitle) && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.label2}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            width={90}
          />
        )
      }
    />
  );
});
