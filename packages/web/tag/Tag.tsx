import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { TagBaseProps } from '@cbhq/cds-common';
import { tagColorMap } from '@cbhq/cds-common/tokens/tags';

import { Box, BoxProps } from '../layout';
import { TextCaption, TextLabel1 } from '../typography';
import { cx } from '../utils/linaria';
import { setPaletteConfigToCssVars } from '../utils/palette';

import { tagSpacingStyles } from './tagSpacingStyles';

export const tagStaticClassName = 'cds-tag';
export const Tag = memo(
  forwardRef(
    (
      {
        children,
        intent = 'informational',
        colorScheme = 'blue',
        background: customBackground,
        color: customColor,
        display = 'inline-flex',
        alignItems = 'center',
        justifyContent = 'center',
        testID = 'cds-tag',
        ...props
      }: TagBaseProps & Omit<BoxProps, 'background' | 'backgroundColor' | 'children'>,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const spacingClassName = useMemo(() => tagSpacingStyles[intent], [intent]);
      const { background, foreground } = useMemo(
        () => tagColorMap[intent][colorScheme],
        [colorScheme, intent],
      );
      const Text = useMemo(() => (intent === 'informational' ? TextLabel1 : TextCaption), [intent]);
      const borderRadius = useMemo(
        () => (intent === 'informational' ? 'roundedSmall' : 'roundedFull'),
        [intent],
      );
      const styleOverride = useMemo(
        () =>
          setPaletteConfigToCssVars({
            foreground: customColor ?? foreground,
            background: customBackground ?? background,
          }),
        [background, foreground, customBackground, customColor],
      );

      return (
        <Box
          ref={forwardedRef}
          alignItems={alignItems}
          background="background"
          borderRadius={borderRadius}
          className={cx(tagStaticClassName, spacingClassName)}
          data-testid={testID}
          display={display}
          justifyContent={justifyContent}
          style={styleOverride}
          testID={testID}
          {...props}
        >
          <Text as="span" color="foreground" data-testid={`${testID}--text`} overflow="truncate">
            {children}
          </Text>
        </Box>
      );
    },
  ),
);
