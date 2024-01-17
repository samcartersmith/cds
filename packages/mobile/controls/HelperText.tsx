import React, { memo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';

import { Icon } from '../icons';
import { TextBody, TextLabel2, TextProps } from '../typography';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: InputVariant;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps;

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  ...props
}: HelperTextProps) {
  const density = useScaleDensity();
  const renderErrorIcon = () => (
    <Icon
      accessibilityLabel={errorIconAccessibilityLabel}
      color="negative"
      name="info"
      size="xs"
      spacingEnd={0.5}
      testID={errorIconTestID}
    />
  );

  if (density === 'dense') {
    return (
      <TextBody color={color} {...props}>
        {color === 'negative' && renderErrorIcon()}
        {children}
      </TextBody>
    );
  }

  return (
    <TextLabel2 color={color} {...props}>
      {color === 'negative' && renderErrorIcon()}
      {children}
    </TextLabel2>
  );
});
