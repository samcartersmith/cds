import React, { memo } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { VStack } from '../layout/VStack';
import { LogoProps } from './Logo';
import { SidebarItemProps } from './SidebarItem';

export type SidebarProps = {
  logo: React.ReactElement<LogoProps>;
  children: React.ReactElement<SidebarItemProps>[];
};

export const Sidebar: React.FC<SidebarProps> = memo(({ logo, children }) => {
  return (
    <VStack
      borderedEnd
      height="100%"
      width="100%"
      spacingHorizontal={2}
      spacingBottom={2}
      spacingTop={gutter}
    >
      <VStack spacingTop={0.5} spacingStart={1} spacingBottom={3}>
        {logo}
      </VStack>
      {children}
    </VStack>
  );
});

Sidebar.displayName = 'Sidebar';
