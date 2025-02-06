import React, { memo } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { CellDetailProps, CellDetailVariant } from '@cbhq/cds-common2/types/CellBaseProps';

import { Text } from '../typography/Text';

const variantColorMap: Record<CellDetailVariant, ThemeVars.Color> = {
  foregroundMuted: 'fgMuted',
  negative: 'fgNegative',
  positive: 'fgPositive',
  warning: 'fgWarning',
};

export const CellDetail = memo(function CellDetail({
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  return (
    <>
      {!!detail && (
        <Text as="div" font="body" overflow="truncate" textAlign="end">
          {detail}
        </Text>
      )}

      {!!subdetail && (
        <Text
          as="div"
          color={variantColorMap[variant]}
          font="body"
          overflow="truncate"
          textAlign="end"
        >
          {subdetail}
        </Text>
      )}
    </>
  );
});
