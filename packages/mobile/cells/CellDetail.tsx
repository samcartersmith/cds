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
        <TextBody align="end" numberOfLines={1} adjustsFontSizeToFit={adjustsFontSizeToFit}>
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          align="end"
          numberOfLines={1}
          color={variant}
          // eslint-disable-next-line react/forbid-component-props
          adjustsFontSizeToFit={adjustsFontSizeToFit}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
