import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { TagBaseProps } from '@cbhq/cds-common';
import { horizontalSpacing, tagColorMap } from '@cbhq/cds-common/tokens/tags';

import { usePaletteValueToRgbaString } from '../color/usePaletteValueToRgbaString';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box, BoxProps } from '../layout';
import { TextCaption, TextLabel1 } from '../typography';

export const Tag = memo(
  forwardRef(
    (
      {
        children,
        intent = 'informational',
        colorScheme = 'blue',
        dangerouslySetBackground,
        dangerouslySetColor,
        alignItems = 'center',
        justifyContent = 'center',
        testID = 'cds-tag',
        ...props
      }: TagBaseProps & Omit<BoxProps, 'background' | 'backgroundColor' | 'children'>,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const { background, foreground } = useMemo(
        () => tagColorMap[intent][colorScheme],
        [colorScheme, intent],
      );
      const Text = useMemo(() => (intent === 'informational' ? TextLabel1 : TextCaption), [intent]);
      const borderRadius = useMemo(
        () => (intent === 'informational' ? 'roundedSmall' : 'roundedFull'),
        [intent],
      );
      const backgroundColor = usePaletteValueToRgbaString(dangerouslySetBackground ?? background);
      const color = usePaletteValueToRgbaString(dangerouslySetColor ?? foreground);
      const spacingStyles = useSpacingStyles({ spacingHorizontal: horizontalSpacing[intent] });
      const style = useMemo(() => ({ paddingVertical: 2, ...spacingStyles }), [spacingStyles]);

      return (
        <Box
          ref={forwardedRef}
          alignItems={alignItems}
          background="background"
          borderRadius={borderRadius}
          dangerouslySetBackground={backgroundColor}
          dangerouslySetStyle={style}
          justifyContent={justifyContent}
          testID={testID}
          {...props}
        >
          <Text dangerouslySetColor={color} data-testid={`${testID}--text`} numberOfLines={1}>
            {children}
          </Text>
        </Box>
      );
    },
  ),
);
