import React, { forwardRef, Fragment, memo } from 'react';
import { css, cx } from '@linaria/core';
import { curves, durations } from '@cbhq/cds-common2/motion/tokens';
import { chipMaxWidth } from '@cbhq/cds-common2/tokens/chip';

import { HStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

const contentClass = css`
  transition: background ${durations.fast3}ms cubic-bezier(${curves.global.join(',')});
`;

// styles that clamp the width and height of the Chip container
const containerClass = css`
  max-height: fit-content;
  min-width: min(fit-content, ${chipMaxWidth}px);
`;

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef<HTMLButtonElement, ChipProps>(function Chip(
    {
      children,
      start,
      end,
      maxWidth = chipMaxWidth,
      inverted,
      compact,
      numberOfLines = 1,
      onClick,
      testID,
      accessibilityLabel,
      contentStyle,
      ...pressableProps
    },
    ref,
  ) {
    const hasPressableContainer = Boolean(onClick);

    const content = (
      <HStack
        alignItems="center"
        // need to set the background here if the content is not wrapped in a Pressable
        background={hasPressableContainer ? undefined : 'bgSecondary'}
        borderRadius={500}
        className={cx(contentClass, !hasPressableContainer && containerClass)}
        gap={1}
        maxWidth={maxWidth}
        paddingX={compact ? 1 : 2}
        paddingY={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!hasPressableContainer ? testID : undefined}
      >
        {start}
        {typeof children === 'string' ? (
          <Text font="headline" numberOfLines={numberOfLines}>
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
        {hasPressableContainer ? (
          <Pressable
            ref={ref}
            accessibilityLabel={accessibilityLabel}
            background="bgSecondary"
            borderRadius={500}
            className={containerClass}
            onClick={onClick}
            testID={testID}
            {...pressableProps}
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
