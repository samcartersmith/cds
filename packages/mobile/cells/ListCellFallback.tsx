import React, { memo } from 'react';
import { ListCellFallbackProps } from '@cbhq/cds-common';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Fallback } from '../layout/Fallback';
import { useLineHeightMap } from '../typography/useLineHeightMap';

import { ListCell } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type { ListCellFallbackProps };

export const ListCellFallback = memo(function ListCellFallback({
  title,
  description,
  detail,
  subdetail,
  media,
  compact,
  disableRandomRectWidth,
  rectWidthVariant,
  testID,
}: ListCellFallbackProps) {
  const lineHeight = useLineHeightMap();

  return (
    <ListCell
      testID={testID}
      description={
        description && (
          <Fallback
            testID="list-cell-fallback-description"
            height={lineHeight.body}
            width={110}
            spacingTop={0.5}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
          />
        )
      }
      compact={compact}
      detail={
        detail && (
          <Fallback
            testID="list-cell-fallback-detail"
            height={lineHeight.body}
            width={60}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
          />
        )
      }
      media={media ? <MediaFallback testID="list-cell-fallback-media" type={media} /> : undefined}
      subdetail={
        subdetail && (
          <Fallback
            testID="list-cell-fallback-subdetail"
            height={lineHeight.body}
            width={60}
            spacingTop={0.5}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
          />
        )
      }
      title={
        title && (
          <Fallback
            testID="list-cell-fallback-title"
            height={lineHeight.headline}
            width={90}
            disableRandomRectWidth={disableRandomRectWidth}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
          />
        )
      }
    />
  );
});
