import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { curves, durations } from '@cbhq/cds-common2/motion/tokens';
import { chipMaxWidth } from '@cbhq/cds-common2/tokens/chip';

import { HStack } from '../layout';
import { PressableOpacity } from '../system/PressableOpacity';
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
        background="backgroundSecondary"
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

    const Wrapper = inverted ? InvertedThemeProvider : React.Fragment;

    return (
      <Wrapper>
        {onPress ? (
          <PressableOpacity
            ref={ref}
            // TODO the PressableOpacity props supposedly Omit borderRadius, so its not clear why this is allowed
            borderRadius={500}
            onPress={onPress}
            testID={testID}
            {...props}
          >
            {content}
          </PressableOpacity>
        ) : (
          content
        )}
      </Wrapper>
    );
  }),
);
