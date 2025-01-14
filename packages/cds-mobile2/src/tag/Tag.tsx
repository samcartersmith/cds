import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { TagBaseProps } from '@cbhq/cds-common2';
import { horizontalSpacing, tagColorMap } from '@cbhq/cds-common2/tokens/tags';

import { useTheme } from '../hooks/useTheme';
import { Box, BoxProps } from '../layout';
import { TextCaption, TextLabel1 } from '../typography';

export const Tag = memo(
  forwardRef(
    (
      {
        children,
        intent = 'informational',
        colorScheme = 'blue',
        background: customBackground,
        color: customColor,
        alignItems = 'center',
        justifyContent = 'center',
        testID = 'cds-tag',
        ...props
      }: TagBaseProps & Omit<BoxProps, 'color' | 'background' | 'backgroundColor' | 'children'>,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const { background, foreground } = useMemo(
        () => tagColorMap[intent][colorScheme],
        [colorScheme, intent],
      );
      const Text = useMemo(() => (intent === 'informational' ? TextLabel1 : TextCaption), [intent]);
      const backgroundColor = `rgb(${theme.spectrum[customBackground ?? background]})`;
      const color = `rgb(${theme.spectrum[customColor ?? foreground]})`;
      const style = useMemo(
        () => ({ paddingVertical: 2, paddingHorizontal: theme.space[horizontalSpacing[intent]] }),
        [theme.space, intent],
      );

      return (
        <Box
          ref={forwardedRef}
          alignItems={alignItems}
          background="background"
          borderRadius={intent === 'informational' ? 100 : 1000}
          dangerouslySetBackground={backgroundColor}
          justifyContent={justifyContent}
          style={style}
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
