import React, { memo } from 'react';

import { CellDetailProps as CellDetailBaseProps } from '@cbhq/cds-common';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export interface CellDetailProps extends CellDetailBaseProps {
  adjustsFontSizeToFit?: boolean;
}

export const CellDetail = memo(function CellDetail({
  adjustsFontSizeToFit,
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <TextBody align="end" numberOfLines={1} adjustsFontSizeToFit={adjustsFontSizeToFit}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          align="end"
          numberOfLines={1}
          color={variant}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
