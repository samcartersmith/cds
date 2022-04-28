import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { TextTitle1 } from '@cbhq/cds-web/typography/TextTitle1';

import type { ParsedDoc } from '../scripts/docgenParser';

import { ParentType } from './ParentType';

export function ParentTypes({ props }: ParsedDoc) {
  return (
    <VStack gap={1} alignItems="center">
      <TextTitle1 as="h1" spacingBottom={3}>
        Extends
      </TextTitle1>
      {props.map((item) => {
        return <ParentType key={item.name} {...item} />;
      })}
    </VStack>
  );
}
