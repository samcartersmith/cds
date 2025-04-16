import React, { forwardRef, memo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { CoachmarkBaseProps } from '@cbhq/cds-common';
import { useInvertedSpectrum } from '@cbhq/cds-common/hooks/useInvertedSpectrum';

import { IconButton } from '../buttons';
import { useSpacingValue } from '../hooks/useSpacingValue';
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
      ref: React.ForwardedRef<View>,
    ) => {
      const { width: windowWidth } = useWindowDimensions();
      const spacingHorizontal = useSpacingValue(2);
      const invertedSpectrum = useInvertedSpectrum();

      return (
        <ThemeProvider name="coachmark" spectrum={invertedSpectrum}>
          <VStack
            ref={ref}
            borderRadius="roundedLarge"
            maxWidth={windowWidth - spacingHorizontal * 2}
            overflow="hidden"
            testID={testID}
            width={width}
          >
            {media}
            <VStack spacing={2} background="background">
              <VStack gap={2}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? (
                    <TextHeadline accessibilityRole="header">{title}</TextHeadline>
                  ) : (
                    title
                  )}
                  {typeof content === 'string' ? <TextBody>{content}</TextBody> : content}
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
              <Box position="absolute" right={0} spacing={1} top={0}>
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
