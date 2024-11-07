import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { useSpectrum } from '@cbhq/cds-common';
import { chipMaxWidth } from '@cbhq/cds-common/tokens/chip';

import { HStack } from '../layout';
import { Pressable, ThemeProvider } from '../system';
import { TextHeadline } from '../typography';

import { ChipProps } from './ChipProps';

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef(function Chip(
    {
      children,
      start,
      end,
      inverted,
      maxWidth = chipMaxWidth,
      compact,
      numberOfLines = 1,
      onPress,
      testID,
      contentStyle,
      ...props
    }: ChipProps,
    ref: React.ForwardedRef<View>,
  ) {
    const theme = useSpectrum();
    const invertedTheme = useMemo(() => (theme === 'light' ? 'dark' : 'light'), [theme]);

    const content = (
      <HStack
        alignItems="center"
        background="secondary"
        borderRadius="roundedXLarge"
        gap={1}
        maxWidth={maxWidth}
        minWidth={0}
        spacingHorizontal={compact ? 1 : 2}
        spacingVertical={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!onPress ? testID : undefined}
      >
        {start}
        <HStack flexShrink={1}>
          {typeof children === 'string' ? (
            <TextHeadline numberOfLines={numberOfLines}>{children}</TextHeadline>
          ) : (
            children
          )}
        </HStack>
        {end}
      </HStack>
    );

    return (
      <ThemeProvider name="chip-theme" spectrum={inverted ? invertedTheme : theme}>
        {/* this ensures that when a Chip is wrapped in a VStack it won't fill the entire width of the parent */}
        <HStack>
          {onPress ? (
            <Pressable
              ref={ref}
              background="transparent"
              borderRadius="roundedXLarge"
              onPress={onPress}
              testID={testID}
              {...props}
            >
              {content}
            </Pressable>
          ) : (
            content
          )}
        </HStack>
      </ThemeProvider>
    );
  }),
);
