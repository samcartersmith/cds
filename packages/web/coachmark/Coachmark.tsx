import React, { ForwardedRef, forwardRef, memo } from 'react';
import { CoachmarkBaseProps } from '@cbhq/cds-common';
import { useInvertedSpectrum } from '@cbhq/cds-common/hooks/useInvertedSpectrum';

import { IconButton } from '../buttons';
import { Box, HStack, VStack } from '../layout';
import { ThemeProvider } from '../system';
import { TextBody, TextHeadline } from '../typography';

export type CoachmarkProps = CoachmarkBaseProps;

export const Coachmark = memo(
  forwardRef(
    (
      {
        title,
        content,
        checkbox,
        media,
        onClose,
        action,
        width,
        closeButtonAccessibilityLabel,
        testID,
      }: CoachmarkProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const invertedSpectrum = useInvertedSpectrum();

      return (
        <ThemeProvider spectrum={invertedSpectrum}>
          <VStack
            ref={ref}
            background="background"
            borderRadius="roundedLarge"
            maxWidth={400}
            overflow="hidden"
            position="relative"
            testID={testID}
            width={width}
          >
            {media}
            <VStack spacing={2}>
              <VStack gap={2}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? <TextHeadline as="h2">{title}</TextHeadline> : title}
                  {typeof content === 'string' ? <TextBody as="p">{content}</TextBody> : content}
                </VStack>
                <HStack
                  alignItems="center"
                  justifyContent={checkbox ? 'space-between' : 'flex-end'}
                >
                  {checkbox}
                  {action}
                </HStack>
              </VStack>
            </VStack>
            {!!onClose && (
              <Box alignSelf="flex-start" pin="right" spacing={1}>
                <IconButton
                  transparent
                  accessibilityLabel={closeButtonAccessibilityLabel}
                  name="close"
                  onPress={onClose}
                />
              </Box>
            )}
          </VStack>
        </ThemeProvider>
      );
    },
  ),
);
