import React, { memo } from 'react';
import { CellDetailProps as CellDetailBaseProps } from '@cbhq/cds-common';

import { useLargeTextStyles } from '../hooks/useLargeTextStyles';
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
  const largeTextStyle = useLargeTextStyles();
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <TextBody
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          numberOfLines={1}
          style={largeTextStyle}
        >
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          color={variant}
          numberOfLines={1}
          style={largeTextStyle}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
