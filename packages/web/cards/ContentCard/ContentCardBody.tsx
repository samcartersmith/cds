import React, { forwardRef, memo } from 'react';

import { ContentCardBodyBaseProps } from '../..';
import { Box, BoxElement, HStack, VStack, VStackProps } from '../../layout';
import { TextBody, TextLabel2 } from '../../typography';

export type ContentCardBodyProps = ContentCardBodyBaseProps & VStackProps<BoxElement>;

export const ContentCardBody = memo(
  forwardRef(function ContentCardBody(
    { body, label, media, mediaPosition = 'top', children, testID, ...props }: ContentCardBodyProps,
    ref: React.Ref<HTMLElement>,
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
          <VStack gap={1} maxWidth="100%">
            {typeof body === 'string' ? <TextBody as="p">{body}</TextBody> : body}
            {typeof label === 'string' ? <TextLabel2 as="span">{label}</TextLabel2> : label}
          </VStack>
          {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
        </Stack>
        {children}
      </VStack>
    );
  }),
);
