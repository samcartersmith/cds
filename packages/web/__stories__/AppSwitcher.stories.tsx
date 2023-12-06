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
      enableMobileModal
      showOverlay
      content={<AppSwitcherContent />}
      contentPosition={switcherPositionConfig}
      maxHeight={600}
      width={359}
    >
      {children}
    </Dropdown>
  );
});

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export const AppSwitcher = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
      </AppSwitcherRecipe>
    </HStack>
  );
};

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export const AppSwitcherWithDot = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <DotCount count={4} pin="top-end">
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </DotCount>
      </AppSwitcherRecipe>
    </HStack>
  );
};

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export default {
  title: 'Core Components/Switchers/AppSwitcher (deprecated - moved to cds-web-overlays)',
  component: AppSwitcher,
};
