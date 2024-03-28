import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardBodyBaseProps } from '@cbhq/cds-common';

import { Box, HStack, VStack, VStackProps } from '../../layout';
import { TextBody, TextLabel2 } from '../../typography';

export type ContentCardBodyProps = ContentCardBodyBaseProps & VStackProps;

export const ContentCardBody = memo(
  forwardRef(function ContentCardBody(
    { body, label, media, mediaPosition = 'top', children, testID, ...props }: ContentCardBodyProps,
    ref: ForwardedRef<View>,
  ) {
    const Stack = mediaPosition === 'right' ? HStack : VStack;
    const mediaBox =
      mediaPosition === 'right' ? (
        <Box flexShrink={0} height={96} width={96}>
          {media}
        </Box>
      ) : (
        media
      );
    return (
      <VStack ref={ref} gap={1} testID={testID} {...props}>
        <Stack gap={1} justifyContent="space-between">
          {mediaPosition === 'top' && mediaBox}
          <VStack gap={1} maxWidth={mediaPosition === 'right' ? '70%' : '100%'}>
            {typeof body === 'string' ? <TextBody>{body}</TextBody> : body}
            {typeof label === 'string' ? <TextLabel2>{label}</TextLabel2> : label}
          </VStack>
          {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
        </Stack>
        {children}
      </VStack>
    );
  }),
);
