import React, { forwardRef, memo } from 'react';
import type { ContentCardBodyBaseProps as BaseProps } from '@cbhq/cds-common2/types';

import { Polymorphic } from '../../core/polymorphism';
import { type BoxBaseProps, Box, HStack, VStack } from '../../layout';
import { TextBody, TextLabel2 } from '../../typography';

export const contentCardBodyDefaultElement = 'div';
export type ContentCardBodyDefaultElement = typeof contentCardBodyDefaultElement;

export type ContentCardBodyBaseProps = Polymorphic.ExtendableProps<BoxBaseProps, BaseProps>;

export type ContentCardBodyProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardBodyBaseProps
>;

type ContentCardBodyComponent = (<
  AsComponent extends React.ElementType = ContentCardBodyDefaultElement,
>(
  props: ContentCardBodyProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCardBody: ContentCardBodyComponent = memo(
  forwardRef<React.ReactElement<ContentCardBodyBaseProps>, ContentCardBodyBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        body,
        label,
        media,
        mediaPosition = 'top',
        children,
        gap = 1,
        testID,
        ...props
      }: ContentCardBodyProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardBodyDefaultElement) satisfies React.ElementType;
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
        <VStack ref={ref} as={Component} gap={gap} testID={testID} {...props}>
          <Stack
            gap={isHorizontal ? 2 : 1}
            justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
          >
            {(mediaPosition === 'top' || mediaPosition === 'left') && mediaBox}
            <VStack gap={1} maxWidth="100%">
              {typeof body === 'string' ? <TextBody as="p">{body}</TextBody> : body}
              {typeof label === 'string' ? <TextLabel2 as="span">{label}</TextLabel2> : label}
            </VStack>
            {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
          </Stack>
          {children}
        </VStack>
      );
    },
  ),
);
