import React, { memo } from 'react';

import { VStack } from '../layout/VStack';

type SidebarProps = {
  logo: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = memo(({ logo, children }) => {
  return (
    <VStack borderedEnd height="100%" width="100%" spacingHorizontal={2} spacingVertical={3}>
      <VStack spacingStart={2} spacingBottom={3}>
        {logo}
      </VStack>
      {children}
    </VStack>
  );
});

Sidebar.displayName = 'Sidebar';
