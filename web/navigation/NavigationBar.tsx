import React, { memo } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import { HStack } from '../layout/HStack';
import { Spacer } from '../layout/Spacer';
import { VStack } from '../layout/VStack';
import { NavigationBarControlsProps } from './NavigationBarControls';
import { NavigationBarCtasProps } from './NavigationBarCtas';
import { NavigationBarTitlesProps } from './NavigationBarTitles';

export interface NavigationBarProps {
  controls?: React.ReactElement<NavigationBarControlsProps>;
  titles?: React.ReactElement<NavigationBarTitlesProps>;
  ctas?: React.ReactElement<NavigationBarCtasProps>;
  actions?: React.ReactElement;
  // Added in Navigation.tsx via cloneElement
  headerHeight?: number;
  tabsHeight?: number;
  scrollRef?: React.RefObject<HTMLElement>;
}

export const NavigationBar = memo(({ controls, titles, ctas, actions }: NavigationBarProps) => {
  return (
    <>
      <VStack>
        <HStack alignItems="baseline">
          {controls}
          <HStack alignItems="baseline">{titles}</HStack>
        </HStack>
      </VStack>
      <Spacer />
      {ctas}
      {actions}
      <Divider
        pin="bottom"
        offsetHorizontal={gutter}
        width={`calc(100% + var(--spacing-${gutter}) * 2)`}
      />
    </>
  );
});

NavigationBar.displayName = 'NavigationBar';
