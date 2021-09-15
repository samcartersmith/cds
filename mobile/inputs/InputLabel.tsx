import { PaletteForeground } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';

import { TextStyle as RNTextStyle } from 'react-native';
import { TextLabel1 } from '../typography/TextLabel1';
import { DangerouslySetStyle } from '../types';

export type InputLabelProps = {
  /** Short description indicating purpose of input */
  label: string;
  /** Color of label */
  labelColor?: PaletteForeground;
  /**
   * Text alignment for this label
   * @default left
   */
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} & SharedProps &
  DangerouslySetStyle<RNTextStyle, false>;

export const InputLabel = memo(function InputLabel({
  label,
  textAlign = 'left',
  labelColor = 'foreground',
  dangerouslySetStyle,
  testID,
}: InputLabelProps) {
  return (
    <TextLabel1
      testID={testID}
      accessibilityLabel={label}
      accessibilityHint={label}
      dangerouslySetStyle={[dangerouslySetStyle, { textAlign }]}
      color={labelColor}
    >
      {label}
    </TextLabel1>
  );
});
