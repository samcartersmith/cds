import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { BoxProps, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

import { RichText } from '../components/RichText';

export type TextBlockFields = {
  title: string;
  description?: Document;
} & Pick<BoxProps, 'width'>;

export const TextBlock = memo(function TextBlock({ title, description, width }: TextBlockFields) {
  return (
    <VStack width={width}>
      <TextHeadline as="p" spacingBottom={2}>
        {title}
      </TextHeadline>
      <RichText content={description} />
    </VStack>
  );
});
