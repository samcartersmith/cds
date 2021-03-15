import React, { memo } from 'react';

import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { LogoMarkProps } from '../icons/LogoMark';
import { VStack } from '../layout/VStack';
import { SidebarItemProps } from './SidebarItem';

export type SidebarProps = {
  logo: React.ReactElement<LogoMarkProps>;
  children: React.ReactElement<SidebarItemProps>[];
};

export const Sidebar: React.FC<SidebarProps> = memo(({ logo, children }) => {
  return (
    <ScaleProvider value={DEFAULT_SCALE}>
      <VStack
        background
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
    </ScaleProvider>
  );
});

Sidebar.displayName = 'Sidebar';
