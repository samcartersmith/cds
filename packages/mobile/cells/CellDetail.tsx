import React, { memo } from 'react';
import { CellDetailProps as CellDetailBaseProps } from '@cbhq/cds-common';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { getAdjustsFontSizeToFitProp } from '../utils/getAdjustsFontSizeToFitProp';

export type CellDetailProps = {
  adjustsFontSizeToFit?: boolean;
} & CellDetailBaseProps;

export const CellDetail = memo(function CellDetail({
  adjustsFontSizeToFit,
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  const safeAdjustFontSizeToFit = getAdjustsFontSizeToFitProp({ enabled: adjustsFontSizeToFit });
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <TextBody align="end" numberOfLines={1} {...safeAdjustFontSizeToFit}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody align="end" numberOfLines={1} color={variant} {...safeAdjustFontSizeToFit}>
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
