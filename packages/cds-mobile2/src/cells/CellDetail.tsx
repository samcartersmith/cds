import React, { memo } from 'react';
import { CellDetailProps as CellDetailBaseProps, CellDetailVariant } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export type CellDetailProps = {
  adjustsFontSizeToFit?: boolean;
} & CellDetailBaseProps;

const variantColorMap: Record<CellDetailVariant, ThemeVars.Color> = {
  foregroundMuted: 'fgMuted',
  negative: 'fgNegative',
  positive: 'fgPositive',
  warning: 'fgWarning',
};

export const CellDetail = memo(function CellDetail({
  adjustsFontSizeToFit,
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <TextBody adjustsFontSizeToFit={adjustsFontSizeToFit} numberOfLines={1}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          color={variantColorMap[variant]}
          numberOfLines={1}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
