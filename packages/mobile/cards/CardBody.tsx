import React, { memo } from 'react';
import { CardBodyBaseProps, CardBodyOrientationProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';

export type CardBodyProps = CardBodyBaseProps & CardBodyOrientationProps;

export const CardBody: React.FC<React.PropsWithChildren<CardBodyProps>> = memo(
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
        <TextHeadline ellipsizeMode="tail" numberOfLines={numberOfLines}>
          {title}
        </TextHeadline>
        <TextBody color="foregroundMuted" ellipsizeMode="tail" numberOfLines={numberOfLines}>
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
        alignItems="center"
        gap={1}
        justifyContent="space-between"
        spacingBottom={media ? 2 : 0}
        spacingHorizontal={3}
        spacingTop={2}
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
