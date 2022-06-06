import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { TagBaseProps } from '@cbhq/cds-common';
import { tagColorMap } from '@cbhq/cds-common/tokens/tags';

import { Box } from '../layout';
import { TextCaption, TextLabel1 } from '../typography';
import { setPaletteConfigToCssVars } from '../utils/palette';

import { tagSpacingStyles } from './tagSpacingStyles';

export const Tag = memo(
  forwardRef(
    (
      {
        children,
        intent = 'informational',
        colorScheme = 'blue',
        dangerouslySetBackground,
        dangerouslySetColor,
        testID = 'cds-tag',
        ...props
      }: TagBaseProps,
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
            foreground: dangerouslySetColor ?? foreground,
            background: dangerouslySetBackground ?? background,
          }),
        [background, foreground, dangerouslySetBackground, dangerouslySetColor],
      );

      return (
        <Box
          ref={forwardedRef}
          dangerouslySetClassName={spacingClassName}
          dangerouslySetStyle={styleOverride}
          background="background"
          alignItems="center"
          justifyContent="center"
          borderRadius={borderRadius}
          data-testid={testID}
          {...props}
        >
          <Text as="span" color="foreground" overflow="truncate" data-testid={`${testID}--text`}>
            {children}
          </Text>
        </Box>
      );
    },
  ),
);
