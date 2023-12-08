import React, { memo } from 'react';
import { CardBodyBaseProps, CardBodyOrientationProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextHeadline } from '../typography/TextHeadline';
import { TextLabel2 } from '../typography/TextLabel2';

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
    compact,
    ...props
  }) => {
    const cardSpacing = compact ? 2 : 3;
    const verticalContent = (
      <VStack testID={testID} {...props}>
        {media}
        <VStack spacingHorizontal={cardSpacing} spacingTop={2}>
          <VStack gap={1} spacingBottom={3}>
            {typeof title === 'string' ? <TextHeadline as="h3">{title}</TextHeadline> : title}
            {typeof description === 'string' ? (
              <TextLabel2 as="p" color="foregroundMuted" numberOfLines={numberOfLines}>
                {description}
              </TextLabel2>
            ) : (
              description
            )}
          </VStack>
          {children}
        </VStack>
      </VStack>
    );

    const horizontalContent = (
      <HStack
        alignItems="center"
        flexGrow={1}
        gap={1}
        justifyContent="space-between"
        maxWidth="100%"
        spacingBottom={children && compact ? 1 : cardSpacing}
        spacingHorizontal={cardSpacing}
        spacingTop={cardSpacing}
        testID={testID}
        {...props}
      >
        <VStack alignItems="flex-start" gap={2} width="70%">
          <VStack gap={1} maxWidth="100%" spacingTop={media ? 0 : 2}>
            <TextHeadline as="h3">{title}</TextHeadline>
            <TextLabel2 as="p" color="foreground" numberOfLines={numberOfLines}>
              {description}
            </TextLabel2>
          </VStack>
          {children}
        </VStack>
        {media}
      </HStack>
    );

    return orientation === 'vertical' ? verticalContent : horizontalContent;
  },
);
