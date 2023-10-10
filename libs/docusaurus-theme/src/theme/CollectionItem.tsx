import React, { memo } from 'react';
import type { FlexAlignCommon } from '@cbhq/cds-common';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

export type CollectionItemProps = {
  media?: JSX.Element;
  title?: string;
  description?: string | string[];
  flexGrow?: number;
  textAlign?: FlexAlignCommon;
  href?: string;
  children?: React.ReactNode;
};

const CollectionItem = memo(function CollectionItem({
  media,
  title,
  description,
  flexGrow = 1,
  children,
  textAlign = 'center',
  href,
  ...rest
}: CollectionItemProps) {
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
        <VStack flexGrow={0} flexBasis={0} alignItems={textAlign} justifyContent="flex-start">
          {media}
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
});

CollectionItem.displayName = 'CollectionItem';

export default CollectionItem;
