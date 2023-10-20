import React, { memo } from 'react';
import type { SpacingScale } from '@cbhq/cds-common';
import { HStack } from '@cbhq/cds-web/layout';

export type CollectionProps = {
  children: React.ReactNode;
  spacingVertical?: SpacingScale;
};

const Collection = memo(function Collection({
  children,
  spacingVertical = 6,
  ...props
}: CollectionProps) {
  return (
    <HStack
      alignItems="flex-start"
      flexWrap="wrap"
      justifyContent="flex-start"
      spacingVertical={spacingVertical}
      {...props}
    >
      {children}
    </HStack>
  );
});

Collection.displayName = 'Collection';
export default Collection;
