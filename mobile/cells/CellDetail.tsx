import React, { memo } from 'react';

import { PaletteForeground } from '@cbhq/cds-common';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export interface CellDetailProps {
  /** Label and or extra detail. */
  detail?: NonNullable<React.ReactNode>;
  /** Subdetail providing more information. */
  subdetail?: NonNullable<React.ReactNode>;
  /** Variant color to apply to the subdetail text. */
  variant?: Extract<PaletteForeground, 'foregroundMuted' | 'negative' | 'positive'>;
}

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
        <TextBody align="end" numberOfLines={1}>
          {detail}
        </TextBody>
      )}

      {subdetail && (
        <TextBody align="end" numberOfLines={1} color={variant}>
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
