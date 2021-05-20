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
      {detail && (
        <TextBody as="div" align="end">
          {detail}
        </TextBody>
      )}

      {subdetail && (
        <TextBody as="div" align="end" color={variant}>
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
