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
          // eslint-disable-next-line react/forbid-component-props
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          dangerouslySetStyle={largeTextStyle}
          numberOfLines={1}
        >
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          // eslint-disable-next-line react/forbid-component-props
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          color={variant}
          dangerouslySetStyle={largeTextStyle}
          numberOfLines={1}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
