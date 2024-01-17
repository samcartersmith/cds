import React, { memo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';

import { Icon } from '../icons';
import { Box } from '../layout';
import { TextBody, TextLabel2, TextProps } from '../typography';

export type HelperTextProps = {
  /** Color of helper text */
  color?: InputVariant;
  /** Used to associate the helper text with an input */
  id?: string;
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
    <Box as="span" display="inline-block" spacingEnd={0.5}>
      <Icon
        accessibilityLabel={errorIconAccessibilityLabel}
        color="negative"
        name="info"
        size="xs"
        testID={errorIconTestID}
      />
    </Box>
  );

  if (density === 'dense') {
    return (
      <TextBody as="p" color={color} {...props}>
        {color === 'negative' && renderErrorIcon()}
        {children}
      </TextBody>
    );
  }

  return (
    <TextLabel2 as="p" color={color} {...props}>
      {color === 'negative' && renderErrorIcon()}
      {children}
    </TextLabel2>
  );
});
