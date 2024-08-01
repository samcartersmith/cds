import React, { forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import { useSpectrum } from '@cbhq/cds-common';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { chipMaxWidth } from '@cbhq/cds-common/tokens/chip';

import { HStack } from '../layout';
import { PressableOpacity, ThemeProvider } from '../system';
import { TextHeadline } from '../typography';

import { ChipProps } from './ChipProps';

const motionStyles = css`
  transition: background ${durations.fast3}ms cubic-bezier(${curves.global.join(',')});
`;

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
      accessibilityLabel,
      contentStyle,
      ...props
    }: ChipProps,
    ref: React.Ref<HTMLElement>,
  ) {
    const theme = useSpectrum();
    const invertedTheme = useMemo(() => (theme === 'light' ? 'dark' : 'light'), [theme]);

    const content = (
      <HStack
        accessibilityLabel={accessibilityLabel}
        alignItems="center"
        background="secondary"
        borderRadius="roundedXLarge"
        className={motionStyles}
        gap={1}
        maxWidth={maxWidth}
        spacingHorizontal={compact ? 1 : 2}
        spacingVertical={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!onPress ? testID : undefined}
      >
        {start}
        {typeof children === 'string' ? (
          <TextHeadline as="span" numberOfLines={numberOfLines}>
            {children}
          </TextHeadline>
        ) : (
          children
        )}
        {end}
      </HStack>
    );

    return (
      <ThemeProvider spectrum={inverted ? invertedTheme : theme}>
        {onPress ? (
          <PressableOpacity
            ref={ref}
            borderRadius="roundedXLarge"
            onPress={onPress}
            testID={testID}
            {...props}
          >
            {content}
          </PressableOpacity>
        ) : (
          content
        )}
      </ThemeProvider>
    );
  }),
);
