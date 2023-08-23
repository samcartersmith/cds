import React, { memo } from 'react';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { DotCount } from '@cbhq/cds-web/dots/DotCount';
import { HStack } from '@cbhq/cds-web/layout';

import { Dropdown } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover/PopoverProps';

import { AppSwitcherContent } from './AppSwitcherContent';

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom',
  gap: 1,
};

/** This is the component that Identity will likely encapsulate themselves. */
const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Dropdown
      width={359}
      maxHeight={600}
      content={<AppSwitcherContent />}
      showOverlay
      enableMobileModal
      contentPosition={switcherPositionConfig}
    >
      {children}
    </Dropdown>
  );
});

export const AppSwitcher = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
      </AppSwitcherRecipe>
    </HStack>
  );
};

export const AppSwitcherWithDot = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <DotCount pin="top-end" count={4}>
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </DotCount>
      </AppSwitcherRecipe>
    </HStack>
  );
};

export default {
  title: 'Overlays/Switchers/AppSwitcher',
  component: AppSwitcher,
};
