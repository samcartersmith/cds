import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Banner } from '@cbhq/cds-web/banner/Banner';
import { BoxProps, VStack } from '@cbhq/cds-web/layout';
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
  if (variant === 'banner') {
    return (
      <Banner startIcon="info" title={title} variant="informational">
        <RichText content={description} />
      </Banner>
    );
  }

  return (
    <VStack width={width}>
      <TextHeadline as="p" spacingBottom={2}>
        {title}
      </TextHeadline>
      <RichText content={description} />
    </VStack>
  );
});
