import React, { memo } from 'react';
import { useIndexTracker } from '@cbhq/cds-common/context/TrackIndexProvider';

import { Divider } from '../../layout/Divider';
import { VStack } from '../../layout/VStack';
import { TextCaption } from '../../typography/TextCaption';

import { hideForCondensed, showForCondensed } from './navigationStyles';
import { navbarSpacing } from './navigationTokens';

/** @deprecated */
export type SidebarSectionProps = {
  title: string;
  children: React.ReactNode;
};

/** @deprecated */
export const SidebarSection: React.FC<React.PropsWithChildren<SidebarSectionProps>> = memo(
  ({ title, children }) => {
    const { isFirst, isLast } = useIndexTracker();
    return (
      <VStack as="li">
        <VStack spacingTop={isFirst ? 0 : navbarSpacing.betweenGroups}>
          {isLast && (
            <Divider
              spacingBottom={navbarSpacing.betweenGroups}
              dangerouslySetClassName={showForCondensed}
            />
          )}
        </VStack>
        <TextCaption
          as="p"
          color="foregroundMuted"
          spacingStart={navbarSpacing.withinGroups}
          spacingBottom={navbarSpacing.withinGroups}
          dangerouslySetClassName={hideForCondensed}
        >
          {title}
        </TextCaption>
        <ul>{children}</ul>
      </VStack>
    );
  },
);

SidebarSection.displayName = 'SidebarSection';
