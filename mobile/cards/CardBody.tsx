import React from 'react';
import { CardBodyBaseProps, CardBodyOrientationProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { VStack, VStackProps } from '../layout/VStack';
import { TextHeadline } from '../typography/TextHeadline';
import { TextBody } from '../typography/TextBody';

export type CardBodyProps = VStackProps & CardBodyBaseProps & CardBodyOrientationProps;

export const CardBody: React.FC<CardBodyProps> = ({
  title,
  description,
  media,
  children,
  orientation = 'vertical',
  ...props
}) => {
  const verticalContent = (
    <VStack>
      {media}
      <VStack gap={1} {...props}>
        <VStack gap={1}>
          <TextHeadline>{title}</TextHeadline>
          <TextBody color="foregroundMuted">{description}</TextBody>
        </VStack>
        {children}
      </VStack>
    </VStack>
  );

  const horizontalContent = (
    <HStack gap={1} justifyContent="space-between">
      <VStack gap={1} {...props}>
        <VStack gap={1}>
          <TextHeadline>{title}</TextHeadline>
          <TextBody color="foregroundMuted">{description}</TextBody>
        </VStack>
        {children}
      </VStack>
      {media}
    </HStack>
  );

  return orientation === 'vertical' ? verticalContent : horizontalContent;
};
