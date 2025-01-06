import React, { memo } from 'react';
import { ListCellFallbackProps } from '@cbhq/cds-common2';
import { getRectWidthVariant } from '@cbhq/cds-common2/utils/getRectWidthVariant';

import { Fallback } from '../layout/Fallback';
import { useTheme } from '../system';

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
  const theme = useTheme();

  return (
    <ListCell
      compact={compact}
      description={
        description && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.body}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
            testID="list-cell-fallback-description"
            width={110}
          />
        )
      }
      detail={
        detail && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.body}
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
            height={theme.lineHeight.body}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
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
            height={theme.lineHeight.headline}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            testID="list-cell-fallback-title"
            width={90}
          />
        )
      }
    />
  );
});
