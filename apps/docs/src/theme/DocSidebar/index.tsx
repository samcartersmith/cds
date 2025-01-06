import React from 'react';
import { useWindowSize } from '@docusaurus/theme-common';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';
import type { Props } from '@theme/DocSidebar';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';

export default function DocSidebar(props: Props): JSX.Element {
  const windowSize = useWindowSize();

  const filterItems = (items: PropSidebarItem[] = []): PropSidebarItem[] => {
    return items?.filter((item) => !item.customProps?.hidden).map((item) => item);
  };

  // Filter the sidebar items
  const filteredSidebar = filterItems([...props.sidebar]);

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktop {...props} sidebar={filteredSidebar} />}
      {shouldRenderSidebarMobile && <DocSidebarMobile {...props} sidebar={filteredSidebar} />}
    </>
  );
}
