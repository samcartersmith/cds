import React, { memo } from 'react';
import { css } from '@linaria/core';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import type { StaticStyleProps } from '../styles/styleProps';
import { Text, TextProps } from '../text/Text';

export type HelperTextProps = {
  /** Color of helper text. negative color will render an icon */
  color?: StaticStyleProps['color'];
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
  textAlign = 'start',
  ...props
}: HelperTextProps) {
  return (
    <Text as="span" color={color} font="label2" textAlign={textAlign} {...props}>
      {color === 'textNegative' && (
        <Box as="span" className={boxStyle}>
          <Icon
            accessibilityLabel={errorIconAccessibilityLabel}
            color="iconNegative"
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
