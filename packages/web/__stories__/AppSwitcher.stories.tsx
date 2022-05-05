import { memo } from 'react';

import { NavigationIconButton } from '../buttons/NavigationIconButton';
import { DotCount } from '../dots/DotCount';
import { Dropdown } from '../dropdown';
import { HStack } from '../layout';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';

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
  title: 'Core Components/Switchers/AppSwitcher',
  component: AppSwitcher,
};
