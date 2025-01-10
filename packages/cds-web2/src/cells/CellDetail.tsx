import React, { memo } from 'react';
import type { CellDetailProps } from '@cbhq/cds-common2/types/CellBaseProps';

import { Text } from '../text/Text';

export const CellDetail = memo(function CellDetail({
  detail,
  subdetail,
  variant = 'textForegroundMuted',
}: CellDetailProps) {
  return (
    <>
      {!!detail && (
        <Text as="div" font="body" overflow="truncate" textAlign="end">
          {detail}
        </Text>
      )}

      {!!subdetail && (
        <Text as="div" color={variant} font="body" overflow="truncate" textAlign="end">
          {subdetail}
        </Text>
      )}
    </>
  );
});
