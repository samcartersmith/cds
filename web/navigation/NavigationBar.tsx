import React, { memo } from 'react';

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
  hideTitles?: boolean;
}

export const NavigationBar = memo(
  ({ controls, titles, ctas, actions, hideTitles }: NavigationBarProps) => {
    return (
      <HStack width="100%" alignItems="flex-start" justifyContent="space-between">
        <VStack>
          <HStack alignItems="baseline">
            {controls}
            {!hideTitles && titles}
          </HStack>
        </VStack>
        <Spacer />
        {ctas}
        {actions}
      </HStack>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';
