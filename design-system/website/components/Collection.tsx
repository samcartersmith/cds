import React from 'react';
import { VStack, HStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';
import type { FlexAlignCommon, SpacingScale } from '@cbhq/cds-common';

import { Image, ImageProps } from './Image';
import { Video, VideoProps } from './Video';

type CollectionProps = {
  children: React.ReactNode;
  spacingVertical?: SpacingScale;
};

type ItemProps = {
  img?: ImageProps;
  vid?: VideoProps;
  title?: string;
  description?: string | string[];
  flexGrow?: number;
  textAlign?: FlexAlignCommon;
};

export const Collection: React.FC<CollectionProps> = ({
  children,
  spacingVertical = 6,
  ...props
}) => {
  return (
    <HStack
      spacingVertical={spacingVertical}
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      {...props}
    >
      {children}
    </HStack>
  );
};

export const Item: React.FC<ItemProps> = ({
  img,
  vid,
  title,
  description,
  flexGrow = 1,
  children,
  textAlign = 'center',
  ...rest
}) => {
  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <>
          {description.map((string) => (
            <TextLabel2 key={string} color="foregroundMuted" as="p">
              {string}
            </TextLabel2>
          ))}
        </>
      );
    }

    return (
      <TextLabel2 color="foregroundMuted" as="p">
        {description}
      </TextLabel2>
    );
  };

  return (
    <VStack
      flexGrow={flexGrow}
      flexBasis={0}
      justifyContent="center"
      alignItems="center"
      gap={1}
      spacingTop={4}
      spacingHorizontal={1}
      {...rest}
    >
      {children ?? (
        <VStack flexGrow={0} flexBasis={0} alignItems="center" justifyContent="flex-start">
          {img && <Image {...img} />}
          {vid && <Video {...vid} />}
          <VStack flexGrow={1} spacingTop={2} alignItems={textAlign} justifyContent="center">
            {!!title && (
              <TextLabel1 as="p" noWrap spacingBottom={1}>
                {title}
              </TextLabel1>
            )}
            {renderDescription()}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};
