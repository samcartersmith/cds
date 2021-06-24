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
      {detail && (
        <TextBody as="div" align="end" overflow="truncate">
          {detail}
        </TextBody>
      )}

      {subdetail && (
        <TextBody as="div" align="end" overflow="truncate" color={variant}>
          {subdetail}
        </TextBody>
      )}
    </>
  );
});
