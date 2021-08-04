// Children are typed with any
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useMemo, memo } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';
import flattenNodes, { hasProps } from '@cbhq/cds-common/utils/flattenNodes';

import { Button } from '../buttons';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import { NavigationBarProps } from './NavigationBar';
import { NavigationIconButton } from './NavigationIconButton';
import { NavigationListItem } from './NavigationListItem';
import { SidebarProps } from './Sidebar';
import { MobileMenuChildrenContext } from './MobileMenuChildrenContext';

export type MobileMenuProps = {
  sidebar?: SidebarProps['children'];
  navbar: React.ReactElement<NavigationBarProps>;
};

export const MobileMenu = memo(({ sidebar, navbar }: MobileMenuProps) => {
  const navbarCtas = useMemo(() => {
    return flattenNodes(navbar?.props.ctas?.props.children)
      .filter((child) => child && typeof child === 'object' && child.type === Button)
      .map((child) => {
        if (hasProps(child)) {
          return <NavigationListItem key={child.props.children} label={child.props.children} />;
        }
        return <NavigationListItem key={child} label={child as string} />;
      });
  }, [navbar]);

  const navbarActions = useMemo(() => {
    return flattenNodes(navbar?.props.actions?.props.children as React.ReactNode)
      .filter((child) => child && typeof child === 'object' && child.type === NavigationIconButton)
      .map((child) => {
        if (hasProps(child)) {
          return <NavigationListItem key={child.props.label} label={child.props.label} />;
        }
        return <NavigationListItem key={child} label={child as string} />;
      });
  }, [navbar]);

  return (
    <MobileMenuChildrenContext.Provider value>
      <VStack offsetHorizontal={gutter} width="100%">
        {sidebar}
        {/* Verify what this spacing should be */}
        <Divider spacingVertical={3} />
        {navbarCtas}
        {navbarActions}
      </VStack>
    </MobileMenuChildrenContext.Provider>
  );
});

MobileMenu.displayName = 'MobileMenu';
