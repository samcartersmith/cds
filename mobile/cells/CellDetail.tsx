import React, { memo } from 'react';

import { CellDetailProps } from '@cbhq/cds-common';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export type { CellDetailProps };

export const CellDetail = memo(function CellDetail({
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  if (!detail && !subdetail) {
    return null;
  }

  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <TextBody align="end" numberOfLines={1}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody align="end" numberOfLines={1} color={variant}>
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
