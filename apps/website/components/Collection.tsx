import React, { useCallback } from 'react';
import type { FlexAlignCommon, SpacingScale } from '@cbhq/cds-common';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { PressableOpacity } from '@cbhq/cds-web/system';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

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
  href?: string;
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
  href,
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
  const handlePress = useCallback(() => {
    if (href) {
      window.open(href, '_blank');
    }
  }, [href]);

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
        <VStack flexGrow={0} flexBasis={0} alignItems={textAlign} justifyContent="flex-start">
          {img && (
            <PressableOpacity onPress={handlePress}>
              <Image {...img} />
            </PressableOpacity>
          )}
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
