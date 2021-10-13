import React, { memo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { TextLabel2, TextBody, TextProps } from '../typography';

export type InputTextProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: InputVariant;
} & TextProps;

export const HelperText = memo(function HelperText({ ...props }: InputTextProps) {
  const density = useScaleDensity();

  if (density === 'dense') {
    return <TextBody {...props} />;
  }

  return <TextLabel2 {...props} />;
});
