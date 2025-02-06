import React, { forwardRef, memo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { CoachmarkBaseProps } from '@cbhq/cds-common2';

import { IconButton } from '../buttons';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack, VStack } from '../layout';
import { InvertedThemeProvider } from '../system';
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
      const theme = useTheme();
      const { width: windowWidth } = useWindowDimensions();
      const paddingX = theme.space[2];

      return (
        <InvertedThemeProvider>
          <VStack
            ref={ref}
            background="bg"
            borderRadius={400}
            maxWidth={windowWidth - paddingX * 2}
            overflow="hidden"
            testID={testID}
            width={width}
          >
            {media}
            <VStack padding={2}>
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
              <Box padding={1} position="absolute" right={0} top={0}>
                <IconButton
                  transparent
                  accessibilityLabel={closeButtonAccessibilityLabel}
                  name="close"
                  onPress={onClose}
                />
              </Box>
            )}
          </VStack>
        </InvertedThemeProvider>
      );
    },
  ),
);
