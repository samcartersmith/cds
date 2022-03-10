import React, { memo } from 'react';

import { TrackIndexProvider } from '@cbhq/cds-common/context/TrackIndexProvider';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { LogoMarkProps } from '../../icons/LogoMark';
import { VStack } from '../../layout/VStack';
import { hideForMobile, sidebarListReset } from './navigationStyles';

export type SidebarProps = {
  logo: React.ReactElement<LogoMarkProps>;
  children: React.ReactNode;
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
        dangerouslySetClassName={hideForMobile}
      >
        <VStack spacingTop={0.5} spacingStart={1} spacingBottom={3}>
          {logo}
        </VStack>
        <ul className={sidebarListReset}>
          <TrackIndexProvider>{children}</TrackIndexProvider>
        </ul>
      </VStack>
    </ScaleProvider>
  );
});

Sidebar.displayName = 'DeprecatedSidebar';
