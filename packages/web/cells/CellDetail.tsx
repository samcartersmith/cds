import React, { memo } from 'react';
import type { CellDetailProps } from '@cbhq/cds-common/types';

import { TextBody } from '../typography/TextBody';

export type { CellDetailProps };

export const CellDetail = memo(function CellDetail({
  detail,
  subdetail,
  variant = 'foregroundMuted',
}: CellDetailProps) {
  return (
    <>
      {!!detail && (
        <TextBody align="end" as="div" overflow="truncate">
          {detail}
        </TextBody>
      )}

      {!!subdetail && (
        <TextBody align="end" as="div" color={variant} overflow="truncate">
          {subdetail}
        </TextBody>
      )}
    </>
  );
});
