import React, { memo } from 'react';
import { FallbackRectWidthProps, SharedProps } from '@cbhq/cds-common/types';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { useTheme } from '../hooks/useTheme';
import { Fallback } from '../layout/Fallback';

import type { CellMediaType } from './CellMedia';
import { ListCell, type ListCellBaseProps } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type ListCellFallbackBaseProps = SharedProps &
  FallbackRectWidthProps &
  Pick<ListCellBaseProps, 'compact' | 'innerSpacing' | 'outerSpacing'> & {
    /** Display description shimmer. */
    description?: boolean;
    /** Display detail shimmer. */
    detail?: boolean;
    /** Display media shimmer with a shape according to type. */
    media?: CellMediaType;
    /** Display subdetail shimmer. */
    subdetail?: boolean;
    /** Display title shimmer. */
    title?: boolean;
  };

export type ListCellFallbackProps = ListCellFallbackBaseProps;

export const ListCellFallback = memo(function ListCellFallback({
  title,
  description,
  detail,
  subdetail,
  media,
  disableRandomRectWidth,
  rectWidthVariant,
  ...props
}: ListCellFallbackProps) {
  const theme = useTheme();

  return (
    <ListCell
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
      media={media ? <MediaFallback testID="list-cell-fallback-media" type={media} /> : undefined}
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
      {...props}
    />
  );
});
