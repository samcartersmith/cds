import React, { memo } from 'react';

import { ListCellFallbackProps } from '@cbhq/cds-common';

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
