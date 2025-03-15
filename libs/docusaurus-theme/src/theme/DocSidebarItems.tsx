import React, { memo, useMemo } from 'react';
import { DocSidebarItemsExpandedStateProvider } from '@docusaurus/plugin-content-docs/client';
import DocSidebarItem from '@theme/DocSidebarItem';
import type { SpacingScale } from '@cbhq/cds-common';
import { Divider, Group, RenderGroupItem } from '@cbhq/cds-web/layout';

import type { PropSidebarItem } from './DocSidebarItem';

type DocSidebarItemsProps = {
  items: PropSidebarItem[];
  activePath: string;
  level: SpacingScale;
};

const sidebarHorizontalSpacing = 2;

function DividerWithGap() {
  return <Divider offsetHorizontal={sidebarHorizontalSpacing} spacingVertical={1} />;
}

const renderItem: RenderGroupItem = function renderItem({ item, Wrapper, isLast }) {
  return (
    <Wrapper>
      {item}
      {isLast && <Divider spacingTop={1} />}
    </Wrapper>
  );
};

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
function DocSidebarItems({ items, ...props }: DocSidebarItemsProps): JSX.Element {
  const filteredItems = useMemo(() => items.filter((item) => !item.customProps?.hidden), [items]);
  return (
    <DocSidebarItemsExpandedStateProvider>
      <Group
        divider={DividerWithGap}
        renderItem={renderItem}
        spacingBottom={3}
        spacingHorizontal={1}
        spacingVertical={1}
      >
        {filteredItems.map((item, index) => (
          <DocSidebarItem key={index} index={index} item={item} {...props} />
        ))}
      </Group>
    </DocSidebarItemsExpandedStateProvider>
  );
}

// Optimize sidebar at each "level"
export default memo(DocSidebarItems);
