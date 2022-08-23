import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Icon } from '@cbhq/cds-web/icons';
import { BoxProps, HStack, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

import { RichText } from '../components/RichText';

export type TextBlockFields = {
  title: string;
  description?: Document;
  variant?: 'default' | 'banner';
} & Pick<BoxProps, 'width'>;

export const TextBlock = memo(function TextBlock({
  title,
  description,
  width,
  variant = 'default',
}: TextBlockFields) {
  const textContent = (
    <VStack width={width}>
      <TextHeadline as="p" spacingBottom={2}>
        {title}
      </TextHeadline>
      <RichText content={description} />
    </VStack>
  );

  if (variant === 'banner') {
    return (
      <HStack bordered borderRadius="rounded" spacingVertical={2} spacingHorizontal={3} gap={2}>
        <Icon name="info" color="foreground" size="s" spacingTop={0.5} />
        {textContent}
      </HStack>
    );
  }

  return textContent;
});
