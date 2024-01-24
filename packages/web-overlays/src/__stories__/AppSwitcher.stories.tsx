import React, { Children, memo, useCallback } from 'react';
import { useToggler } from '@cbhq/cds-common';
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
import { useRefocusTrigger } from '../select/useRefocusTrigger';

import { AppSwitcherContent } from './AppSwitcherContent';

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom-end',
  gap: 1,
};

/** This is the component that Identity will likely encapsulate themselves. */
const AppSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  const isDense = useScaleDensity() === 'dense';

  const [menuHasClosed, toggleMenuHasClosed] = useToggler(false);
  const triggerRef = useRefocusTrigger(menuHasClosed);

  const onOpenMenu = useCallback(() => {
    if (menuHasClosed) {
      toggleMenuHasClosed.toggleOff();
    }
  }, [menuHasClosed, toggleMenuHasClosed]);

  const onCloseMenu = useCallback(() => {
    toggleMenuHasClosed.toggleOn();
  }, [toggleMenuHasClosed]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const childWithRef = React.cloneElement(Children.only(children), {
    ref: triggerRef,
  });

  return (
    <Dropdown
      enableMobileModal
      showOverlay
      content={<AppSwitcherContent />}
      contentPosition={switcherPositionConfig}
      maxHeight={appSwitcherMaxSize}
      onCloseMenu={onCloseMenu}
      onOpenMenu={onOpenMenu}
      width={isDense ? denseAppSwitcherWidth : appSwitcherWidth}
    >
      {childWithRef}
    </Dropdown>
  );
});

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const AppSwitcher = () => {
  return (
    <HStack>
      <AppSwitcherRecipe>
        <NavigationIconButton accessibilityLabel="App Switcher Menu" name="appSwitcher" />
      </AppSwitcherRecipe>
    </HStack>
  );
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
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

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
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
  title: 'Deprecated/AppSwitcher',
  component: AppSwitcher,
};
