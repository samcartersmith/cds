import React, { memo } from 'react';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import {
  appSwitcherMaxSize,
  appSwitcherWidth,
  denseAppSwitcherWidth,
} from '@cbhq/cds-common/tokens/appSwitcher';
import { NavigationIconButton } from '@cbhq/cds-web/buttons/NavigationIconButton';
import { DotCount } from '@cbhq/cds-web/dots/DotCount';
import { HStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';

import { Dropdown } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover/PopoverProps';

import { AppSwitcherContent } from './AppSwitcherContent';

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom-end',
  gap: 1,
};

/** This is the component that Identity will likely encapsulate themselves. */
const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  const isDense = useScaleDensity() === 'dense';
  return (
    <Dropdown
      enableMobileModal
      showOverlay
      content={<AppSwitcherContent />}
      contentPosition={switcherPositionConfig}
      maxHeight={appSwitcherMaxSize}
      width={isDense ? denseAppSwitcherWidth : appSwitcherWidth}
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
        <DotCount count={4} pin="top-end">
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </DotCount>
      </AppSwitcherRecipe>
    </HStack>
  );
};

export const DenseAppSwitcher = () => {
  return (
    <ThemeProvider scale="xSmall">
      <HStack>
        <AppSwitcherRecipe>
          <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
        </AppSwitcherRecipe>
      </HStack>
    </ThemeProvider>
  );
};

export default {
  title: 'Overlays/Switchers/AppSwitcher',
  component: AppSwitcher,
};
