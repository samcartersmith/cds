import { InputVariant } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { TextLabel2, TextBody, TextProps } from '../typography';

export type HelperTextProps = {
  /** Color of helper text */
  color?: InputVariant;
  /** Used to associate the helper text with an input */
  id?: string;
} & TextProps;

export const HelperText = memo(({ ...props }: HelperTextProps) => {
  const density = useScaleDensity();

  if (density === 'dense') {
    return <TextBody as="p" {...props} />;
  }

  return <TextLabel2 as="p" {...props} />;
});
