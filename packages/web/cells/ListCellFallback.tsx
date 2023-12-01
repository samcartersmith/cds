import React, { memo } from 'react';
import type { ListCellFallbackProps } from '@cbhq/cds-common/types';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Box } from '../layout/Box';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import { MediaFallback } from './MediaFallback';

export type { ListCellFallbackProps };

export const ListCellFallback = memo(function ListCellFallback({
  title,
  description,
  detail,
  subdetail,
  media,
  testID,
  disableRandomRectWidth,
  rectWidthVariant,
  innerSpacing,
  outerSpacing,
  innerPadding,
  outerPadding,
}: ListCellFallbackProps) {
  // We cant use ListCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  return (
    <Cell
      detail={
        (detail || subdetail) && (
          <div style={{ width: '100%' }}>
            <Box
              alignContent="flex-end"
              alignItems="flex-end"
              flexDirection="column"
              flexShrink={0}
              justifyContent="center"
              testID="list-cell-fallback-detail"
            >
              {detail && (
                <Fallback
                  percentage
                  disableRandomRectWidth={disableRandomRectWidth}
                  height={22}
                  rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
                  width={60}
                />
              )}
              {subdetail && (
                <Fallback
                  percentage
                  disableRandomRectWidth={disableRandomRectWidth}
                  height={22}
                  rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
                  spacingTop={0.5}
                  width={50}
                />
              )}
            </Box>
          </div>
        )
      }
      innerPadding={innerSpacing || innerPadding}
      media={media && <MediaFallback testID="list-cell-fallback-media" type={media} />}
      outerPadding={outerSpacing || outerPadding}
      testID={testID}
    >
      <div style={{ width: '100%' }}>
        {title && (
          <Fallback
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={22}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            testID="list-cell-fallback-title"
            width={65}
          />
        )}
        {description && (
          <Fallback
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={22}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            spacingTop={0.5}
            testID="list-cell-fallback-description"
            width={85}
          />
        )}
      </div>
    </Cell>
  );
});
