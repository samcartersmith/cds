import React, { memo } from 'react';
import { CellDetailProps as CellDetailBaseProps, CellDetailVariant } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';

import { useLargeTextStyles } from '../hooks/useLargeTextStyles';
import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';

export type CellDetailProps = {
  adjustsFontSizeToFit?: boolean;
} & CellDetailBaseProps;

const variantColorMap: Record<CellDetailVariant, ThemeVars.Color> = {
  foregroundMuted: 'textForegroundMuted',
  negative: 'textNegative',
  positive: 'textPositive',
  warning: 'textWarning',
};

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
          numberOfLines={1}
          style={largeTextStyle}
        >
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody
          // eslint-disable-next-line react/forbid-component-props
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          color={variantColorMap[variant]}
          numberOfLines={1}
          style={largeTextStyle}
        >
          {subdetail}
        </TextBody>
      )}
    </VStack>
  );
});
