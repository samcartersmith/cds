import React, { memo } from 'react';
import { CellDetailProps as CellDetailBaseProps } from '@cbhq/cds-common';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export type CellDetailProps = {
  adjustsFontSizeToFit?: boolean;
} & CellDetailBaseProps;

export const CellDetail = memo(function CellDetail({
  adjustsFontSizeToFit,
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        // eslint-disable-next-line react/forbid-component-props
        <TextBody adjustsFontSizeToFit={adjustsFontSizeToFit} align="end" numberOfLines={1}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          // eslint-disable-next-line react/forbid-component-props
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          align="end"
          color={variant}
          numberOfLines={1}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
