import React, { forwardRef, memo } from 'react';
import { CoachmarkBaseProps } from '@cbhq/cds-common2';

import { IconButton } from '../buttons/IconButton';
import { Box, HStack, VStack } from '../layout';
import { InvertedThemeProvider } from '../system';
import { Text } from '../typography/Text';

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
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      return (
        <InvertedThemeProvider>
          <VStack
            ref={ref}
            background="bg"
            borderRadius={400}
            maxWidth={400}
            overflow="hidden"
            position="relative"
            testID={testID}
            width={width}
          >
            {media}
            <VStack padding={2}>
              <VStack gap={2}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? (
                    <Text as="h2" display="block" font="headline">
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                  {typeof content === 'string' ? (
                    <Text as="p" display="block" font="body">
                      {content}
                    </Text>
                  ) : (
                    content
                  )}
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
              <Box alignSelf="flex-start" padding={1} pin="right">
                <IconButton
                  transparent
                  accessibilityLabel={closeButtonAccessibilityLabel}
                  name="close"
                  onClick={onClose}
                />
              </Box>
            )}
          </VStack>
        </InvertedThemeProvider>
      );
    },
  ),
);
