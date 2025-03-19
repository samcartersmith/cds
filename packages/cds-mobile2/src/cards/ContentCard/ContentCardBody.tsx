import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardBodyBaseProps } from '@cbhq/cds-common2';

import { Box, HStack, VStack, VStackProps } from '../../layout';
import { Text } from '../../typography/Text';

export type ContentCardBodyProps = ContentCardBodyBaseProps & VStackProps;

export const ContentCardBody = memo(
  forwardRef(function ContentCardBody(
    { body, label, media, mediaPosition = 'top', children, testID, ...props }: ContentCardBodyProps,
    ref: React.ForwardedRef<View>,
  ) {
    const isHorizontal = mediaPosition === 'right' || mediaPosition === 'left';
    const Stack = isHorizontal ? HStack : VStack;
    const mediaBox = isHorizontal ? (
      <Box flexShrink={0} height={96} width={96}>
        {media}
      </Box>
    ) : (
      media
    );
    return (
      <VStack ref={ref} gap={1} testID={testID} {...props}>
        <Stack
          gap={isHorizontal ? 2 : 1}
          justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
        >
          {(mediaPosition === 'top' || mediaPosition === 'left') && mediaBox}
          <VStack gap={1} maxWidth={isHorizontal ? '70%' : '100%'}>
            {typeof body === 'string' ? <Text font="body">{body}</Text> : body}
            {typeof label === 'string' ? <Text font="label2">{label}</Text> : label}
          </VStack>
          {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
        </Stack>
        {children}
      </VStack>
    );
  }),
);
