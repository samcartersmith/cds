import React, { useCallback } from 'react';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import {
  type NavbarSecondaryMenuComponent,
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { cx } from '@linaria/core';
import type { Props } from '@theme/DocSidebar/Mobile';
import DocSidebarItems from '@theme/DocSidebarItems';
import { VStack } from '@cbhq/cds-web2/layout';

const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}: Props) => {
  const mobileSidebar = useNavbarMobileSidebar();

  const handleItemClick = useCallback(
    (item: PropSidebarItem) => {
      // Mobile sidebar should only be closed if the category has a link
      if (item.type === 'category' && item.href) {
        mobileSidebar.toggle();
      }
      if (item.type === 'link') {
        mobileSidebar.toggle();
      }
    },
    [mobileSidebar],
  );
  return (
    <VStack
      as="ul"
      className={cx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}
      gap={3}
      paddingLeft={2}
      paddingRight={1.5}
    >
      <DocSidebarItems activePath={path} items={sidebar} level={1} onItemClick={handleItemClick} />
    </VStack>
  );
};

function DocSidebarMobile(props: Props) {
  return <NavbarSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />;
}

export default React.memo(DocSidebarMobile);
