import { styled } from 'linaria/react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { Box, Spacer, VStack, HStack } from '@cbhq/cds-web/layout';
import { TextHeadline, TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';
import { Image, ImageProps } from './Image';
import { Card } from '@cbhq/cds-web/layout/Card';
type CollectionProps = {
  children: React.ReactNode;
};

type ItemProps = {
  img?: ImageProps;
  title?: string;
  description?: string;
};

export const Collection: React.FC<CollectionProps> = ({ children }) => {
  return (
    <HStack spacingVertical={6} flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
      {children}
    </HStack>
  );
};

export const Item: React.FC<ItemProps> = ({ img, title, description }) => {
  return (
    <VStack
      flexGrow={1}
      flexBasis={0}
      justifyContent="center"
      alignItems="center"
      gap={1}
      spacingTop={4}
      spacingHorizontal={1}
    >
      <VStack flexGrow={0} flexBasis={0} alignItems="center" justifyContent="flex-start">
        <Image {...img} />
        <VStack flexGrow={1} spacingTop={2} alignItems="center" justifyContent="center">
          <TextLabel1 as="p" noWrap={true} spacingBottom={1}>
            {title}
          </TextLabel1>
          <TextLabel2 color="foregroundMuted" as="p">
            {description}
          </TextLabel2>
        </VStack>
      </VStack>
    </VStack>
  );
};
