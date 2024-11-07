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
  innerSpacing,
  outerSpacing,
}: ListCellFallbackProps) {
  const lineHeight = useLineHeightMap();

  return (
    <ListCell
      compact={compact}
      description={
        description && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.body}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
            spacingTop={0.5}
            testID="list-cell-fallback-description"
            width={110}
          />
        )
      }
      detail={
        detail && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.body}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            testID="list-cell-fallback-detail"
            width={60}
          />
        )
      }
      innerSpacing={innerSpacing}
      media={media ? <MediaFallback testID="list-cell-fallback-media" type={media} /> : undefined}
      outerSpacing={outerSpacing}
      subdetail={
        subdetail && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.body}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            spacingTop={0.5}
            testID="list-cell-fallback-subdetail"
            width={60}
          />
        )
      }
      testID={testID}
      title={
        title && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={lineHeight.headline}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            testID="list-cell-fallback-title"
            width={90}
          />
        )
      }
    />
  );
});
