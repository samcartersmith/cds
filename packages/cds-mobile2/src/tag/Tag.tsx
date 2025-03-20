import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { TagBaseProps } from '@cbhq/cds-common2';
import {
  tagBorderRadiusMap,
  tagColorMap,
  tagFontMap,
  tagHorizontalSpacing,
} from '@cbhq/cds-common2/tokens/tags';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout';
import { Text } from '../typography/Text';

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
      const { background, foreground } = tagColorMap[intent][colorScheme];
      const backgroundColor = `rgb(${theme.spectrum[customBackground ?? background]})`;
      const color = `rgb(${theme.spectrum[customColor ?? foreground]})`;

      return (
        <Box
          ref={forwardedRef}
          alignItems={alignItems}
          background="bg"
          borderRadius={tagBorderRadiusMap[intent]}
          dangerouslySetBackground={backgroundColor}
          justifyContent={justifyContent}
          paddingX={tagHorizontalSpacing[intent]}
          paddingY={0.25}
          testID={testID}
          {...props}
        >
          <Text
            dangerouslySetColor={color}
            font={tagFontMap[intent]}
            numberOfLines={1}
            testID={`${testID}--text`}
          >
            {children}
          </Text>
        </Box>
      );
    },
  ),
);
