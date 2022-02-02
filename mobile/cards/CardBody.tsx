import React, { memo } from 'react';
import { CardBodyBaseProps, CardBodyOrientationProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextHeadline } from '../typography/TextHeadline';
import { TextBody } from '../typography/TextBody';

export type CardBodyProps = CardBodyBaseProps & CardBodyOrientationProps;

export const CardBody: React.FC<CardBodyProps> = memo(
  ({
    title,
    description,
    media,
    children,
    orientation = 'vertical',
    testID,
    numberOfLines = 3,
  }) => {
    const textContent = (
      <>
        <TextHeadline numberOfLines={numberOfLines} ellipsizeMode="tail">
          {title}
        </TextHeadline>
        <TextBody numberOfLines={numberOfLines} ellipsizeMode="tail">
          {description}
        </TextBody>
      </>
    );
    const verticalContent = (
      <VStack testID={`${testID}-vertical`}>
        {media}
        <VStack spacingHorizontal={3} spacingTop={2}>
          <VStack gap={1} spacingBottom={2}>
            {textContent}
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
        testID={`${testID}-horizontal`}
      >
        <VStack gap={2} width="70%">
          <VStack gap={1} spacingTop={media ? 0 : 2}>
            {textContent}
          </VStack>
          {children}
        </VStack>
        {media}
      </HStack>
    );

    return orientation === 'vertical' ? verticalContent : horizontalContent;
  },
);
