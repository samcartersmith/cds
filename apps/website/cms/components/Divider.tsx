import React, { memo } from 'react';
import { Divider as CDSDivider, DividerProps } from '@cbhq/cds-web/layout';

export const Divider = memo(function Divider({
  spacingVertical = 8,
  spacingTop = spacingVertical,
  spacingBottom = spacingVertical,
  ...rest
}: DividerProps) {
  return <CDSDivider spacingTop={spacingTop} spacingBottom={spacingBottom} {...rest} />;
});
