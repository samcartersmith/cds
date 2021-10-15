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
}) => {
  const verticalContent = (
    <VStack>
      {media}
      <VStack spacingHorizontal={3} spacingTop={2}>
        <VStack gap={1} spacingBottom={2}>
          <TextHeadline>{title}</TextHeadline>
          <TextBody color="foregroundMuted">{description}</TextBody>
        </VStack>
        {children}
      </VStack>
    </VStack>
  );

  const horizontalContent = (
    <HStack
      gap={1}
      justifyContent="space-between"
      alignItems="center"
      spacingHorizontal={3}
      spacingTop={2}
      spacingBottom={media ? 2 : 0}
    >
      <VStack gap={2} width="70%">
        <VStack gap={1} spacingTop={media ? 0 : 2}>
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
