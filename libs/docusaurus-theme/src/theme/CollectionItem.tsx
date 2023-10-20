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
            <TextLabel2 key={string} as="p" color="foregroundMuted">
              {string}
            </TextLabel2>
          ))}
        </>
      );
    }

    return (
      <TextLabel2 as="p" color="foregroundMuted">
        {description}
      </TextLabel2>
    );
  };

  return (
    <VStack
      alignItems="center"
      flexBasis={0}
      flexGrow={flexGrow}
      gap={1}
      justifyContent="center"
      spacingHorizontal={1}
      spacingTop={4}
      {...rest}
    >
      {children ?? (
        <VStack alignItems={textAlign} flexBasis={0} flexGrow={0} justifyContent="flex-start">
          {media}
          <VStack alignItems={textAlign} flexGrow={1} justifyContent="center" spacingTop={2}>
            {!!title && (
              <TextLabel1 noWrap as="p" spacingBottom={1}>
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
