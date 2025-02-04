import React, { forwardRef, Fragment, memo } from 'react';
import { css } from '@linaria/core';
import { curves, durations } from '@cbhq/cds-common2/motion/tokens';
import { chipMaxWidth } from '@cbhq/cds-common2/tokens/chip';

import { HStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

const motionStyles = css`
  transition: background ${durations.fast3}ms cubic-bezier(${curves.global.join(',')});
`;

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef<HTMLElement, ChipProps>(function Chip(
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
      accessibilityLabel,
      contentStyle,
      ...props
    },
    ref,
  ) {
    const content = (
      <HStack
        accessibilityLabel={accessibilityLabel}
        alignItems="center"
        // need to set the background here if the content is not wrapped in a Pressable
        background={onPress ? undefined : 'backgroundSecondary'}
        borderRadius={500}
        className={motionStyles}
        gap={1}
        maxWidth={maxWidth}
        paddingX={compact ? 1 : 2}
        paddingY={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!onPress ? testID : undefined}
      >
        {start}
        {typeof children === 'string' ? (
          <Text as="span" font="headline" numberOfLines={numberOfLines}>
            {children}
          </Text>
        ) : (
          children
        )}
        {end}
      </HStack>
    );

    const Wrapper = inverted ? InvertedThemeProvider : Fragment;

    return (
      <Wrapper>
        {onPress ? (
          <Pressable
            ref={ref}
            background="backgroundSecondary"
            borderRadius={500}
            onPress={onPress}
            testID={testID}
            {...props}
          >
            {content}
          </Pressable>
        ) : (
          content
        )}
      </Wrapper>
    );
  }),
);
