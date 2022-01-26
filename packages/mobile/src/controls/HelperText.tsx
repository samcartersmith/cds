import React, { memo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/src/scale/useScaleDensity';

import { TextBody, TextLabel2, TextProps } from '../typography';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: InputVariant;
} & TextProps;

export const HelperText = memo(function HelperText({ ...props }: HelperTextProps) {
  const density = useScaleDensity();

  if (density === 'dense') {
    return <TextBody {...props} />;
  }

  return <TextLabel2 {...props} />;
});
