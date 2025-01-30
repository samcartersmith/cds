import React, { memo } from 'react';
import { css } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Text, TextProps } from '../typography/Text';

export type HelperTextProps = {
  /** Color of helper text. negative color will render an icon */
  color?: ThemeVars.Color;
  /** Used to associate the helper text with an input */
  id?: string;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps<'span'>;

const boxStyle = css`
  display: inline-block;
  padding-right: var(--space-0\\.5);
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
      textAlign={textAlign}
      {...props}
    >
      {color === 'textNegative' && (
        <Box as="span" className={boxStyle}>
          <Icon
            accessibilityLabel={errorIconAccessibilityLabel}
            color="iconNegative"
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
