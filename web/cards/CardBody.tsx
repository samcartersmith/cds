import React from 'react';

import { HStack } from '../layout/HStack';
import { VStack, VStackProps } from '../layout/VStack';
import { TextHeadline } from '../typography/TextHeadline';
import { TextBody } from '../typography/TextBody';

export const CardBody = ({
  title,
  description,
  media,
  children,
  orientation = 'vertical',
  ...props
}: {
  title?: string;
  description?: string;
  media?: React.ReactNode;
  orientation: 'vertical' | 'horizontal';
} & VStackProps<'div'>) => {
  const verticalContent = (
    <VStack>
      {media}
      <VStack gap={1} {...props}>
        <VStack gap={1}>
          <TextHeadline as="h3">{title}</TextHeadline>
          <TextBody as="p" color="foregroundMuted">
            {description}
          </TextBody>
        </VStack>
        {children}
      </VStack>
    </VStack>
  );

  const horizontalContent = (
    <HStack gap={1} justifyContent="space-between">
      <VStack gap={1} {...props}>
        <VStack gap={1}>
          <TextHeadline as="h3">{title}</TextHeadline>
          <TextBody as="p" color="foregroundMuted">
            {description}
          </TextBody>
        </VStack>
        {children}
      </VStack>
      {media}
    </HStack>
  );

  return orientation === 'vertical' ? verticalContent : horizontalContent;
};
