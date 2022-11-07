import React, { memo } from 'react';
import { ContentCellFallbackProps } from '@cbhq/cds-common';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Fallback, FallbackProps } from '../layout';
import { useLineHeightMap } from '../typography/useLineHeightMap';

import { ContentCell } from './ContentCell';
import { MediaFallback } from './MediaFallback';

export type ContentCellFallbackMobileProps = Pick<FallbackProps, 'dangerouslySetIterations'> &
  ContentCellFallbackProps;

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
  disableRandomRectWidth,
  rectWidthVariant,
  dangerouslySetIterations = 10,
}: ContentCellFallbackMobileProps) {
  const lineHeight = useLineHeightMap();

  return (
    <ContentCell
      description={
        description && (
          <Fallback
            height={lineHeight.body}
            width={110}
            spacingTop={0.5}
            dangerouslySetIterations={dangerouslySetIterations}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
          />
        )
      }
      media={
        media ? (
          <MediaFallback dangerouslySetIterations={dangerouslySetIterations} type={media} />
        ) : undefined
      }
      meta={
        meta && (
          <Fallback
            height={lineHeight.label2}
            width={50}
            dangerouslySetIterations={dangerouslySetIterations}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
          />
        )
      }
      title={
        (title || subtitle) && (
          <Fallback
            height={lineHeight.label2}
            width={90}
            dangerouslySetIterations={dangerouslySetIterations}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
          />
        )
      }
    />
  );
});
