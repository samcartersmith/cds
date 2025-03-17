import React, { memo } from 'react';
import { css } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { type TextDefaultElement, type TextProps, Text } from '../typography/Text';

export type HelperTextProps = {
  /** Color of helper text. negative color will render an icon */
  color?: ThemeVars.Color;
  /** Used to associate the helper text with an input */
  id?: string;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps<TextDefaultElement>;

const boxStyle = css`
  display: inline-block;
  padding-inline-end: var(--space-0\\.5);
`;

export const HelperText = memo(function HelperTex({
  color,
  id,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  dangerouslySetColor,
  textAlign = 'start',
  ...props
}: HelperTextProps) {
  return (
    <Text
      as="span"
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      font="label2"
      id={id}
      textAlign={textAlign}
      {...props}
    >
      {color === 'fgNegative' && (
        <Box as="span" className={boxStyle}>
          <Icon
            accessibilityLabel={errorIconAccessibilityLabel}
            color="fgNegative"
            dangerouslySetColor={dangerouslySetColor}
            name="info"
            size="xs"
            testID={errorIconTestID}
          />
        </Box>
      )}
      {children}
    </Text>
  );
});
