import React, { memo } from 'react';

import { Fallback } from '../layout/Fallback';
import { useLineHeightMap } from '../typography/useLineHeightMap';
import { CellMediaType } from './CellMedia';
import { ListCell } from './ListCell';
import { MediaFallback } from './MediaFallback';

export interface ListCellFallbackProps {
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
}

export const ListCellFallback = memo(function ListCellFallback({
  title,
  description,
  detail,
  subdetail,
  media,
}: ListCellFallbackProps) {
  const lineHeight = useLineHeightMap();
  return (
    <ListCell
      description={
        description && <Fallback height={lineHeight.body} width={110} spacingTop={0.5} />
      }
      detail={detail && <Fallback height={lineHeight.body} width={60} />}
      media={media && <MediaFallback type={media} />}
      subdetail={subdetail && <Fallback height={lineHeight.body} width={60} spacingTop={0.5} />}
      title={title && <Fallback height={lineHeight.headline} width={90} />}
    />
  );
});
