import React, { memo } from 'react';
import TabsOriginal from '@theme-original/Tabs';
import { Entry } from 'contentful';
import { TabProps } from '@cbhq/docusaurus-theme/src/theme/Tabs';

import { TabItem, TabItemFields } from './TabItem';

export type TabsFields = {
  id: string;
  items: Entry<TabItemFields>[];
} & Pick<TabProps, 'variant' | 'gap' | 'spacerHeight'>;

export const Tabs = memo(function Tabs({
  items,
  id,
  variant,
  spacerHeight = 8,
  ...rest
}: TabsFields) {
  return (
    <TabsOriginal groupId={id} spacerHeight={spacerHeight} variant={variant} {...rest}>
      {items?.map(({ fields }) => (
        <TabItem key={fields.label} {...fields} />
      ))}
    </TabsOriginal>
  );
});
