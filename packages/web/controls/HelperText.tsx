import React, { memo, useMemo } from 'react';
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
  dangerouslySetColor,
  ...props
}: HelperTextProps) {
  const density = useScaleDensity();
  const TextComponent = useMemo(() => (density === 'dense' ? TextBody : TextLabel2), [density]);

  return (
    <TextComponent
      as="span"
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      display="block"
      {...props}
    >
      {color === 'negative' && (
        <Box as="span" display="inline-block" spacingEnd={0.5}>
          <Icon
            accessibilityLabel={errorIconAccessibilityLabel}
            color="negative"
            dangerouslySetColor={dangerouslySetColor}
            name="info"
            size="xs"
            testID={errorIconTestID}
          />
        </Box>
      )}
      {children}
    </TextComponent>
  );
});
