import { memo, useMemo } from 'react';
import { DocSidebarItemsExpandedStateProvider } from '@docusaurus/theme-common';
import type { SpacingScale } from '@cbhq/cds-common';
import { Divider, Group } from '@cbhq/cds-web/layout';

import DocSidebarItem, { PropSidebarItem } from './DocSidebarItem';

type DocSidebarItemsProps = {
  items: PropSidebarItem[];
  activePath: string;
  level: SpacingScale;
};

const sidebarHorizontalSpacing = 2;

function DividerWithGap() {
  return <Divider offsetHorizontal={sidebarHorizontalSpacing} spacingVertical={1} />;
}

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
function DocSidebarItems({ items, ...props }: DocSidebarItemsProps): JSX.Element {
  const filteredItems = useMemo(() => items.filter((item) => !item.customProps?.hidden), [items]);
  return (
    <DocSidebarItemsExpandedStateProvider>
      <Group divider={DividerWithGap} spacingVertical={1} spacingHorizontal={1} spacingBottom={3}>
        {filteredItems.map((item, index) => (
          <DocSidebarItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            item={item}
            index={index}
            {...props}
          />
        ))}
      </Group>
    </DocSidebarItemsExpandedStateProvider>
  );
}

// Optimize sidebar at each "level"
export default memo(DocSidebarItems);
