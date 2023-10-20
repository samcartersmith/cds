import React from 'react';
import { defaultContext, SelectProvider } from '@cbhq/cds-web/controls/selectContext';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1 } from '@cbhq/cds-web/typography';

import { SelectOption } from '../SelectOption';

export default {
  title: 'Overlays/Select/SelectOption',
  component: SelectOption,
};

export const Stories = () => {
  return (
    <SelectProvider value={defaultContext}>
      <VStack gap={3} width={200}>
        <VStack role="menu">
          <TextLabel1 as="p">Title and Description</TextLabel1>
          <SelectOption description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Disabled</TextLabel1>
          <SelectOption disabled description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Compact</TextLabel1>
          <SelectOption compact description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Multiline</TextLabel1>
          <SelectOption
            multiline
            description="This is a really long description that will be multiple lines long"
            title="Title"
            value="test"
          />
        </VStack>
      </VStack>
    </SelectProvider>
  );
};
