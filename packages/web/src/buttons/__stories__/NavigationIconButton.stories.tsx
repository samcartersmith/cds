import React from 'react';
import type { NavIconName } from '@cbhq/cds-icons';

import { VStack } from '../../layout';
import { NavigationIconButton } from '../NavigationIconButton';

export default {
  title: 'Core Components/Buttons/NavigationIconButton',
  component: NavigationIconButton,
};

const onClickConsole = () => console.log('clicked');

export const Default = () => (
  <NavigationIconButton
    accessibilityLabel="App switcher"
    name="appSwitcher"
    onClick={onClickConsole}
  />
);

const navigationIconButtonVariants = [
  { name: 'appSwitcher' as NavIconName, variant: 'secondary' },
  { name: 'appSwitcher' as NavIconName, variant: 'foregroundMuted' },
  { name: 'appSwitcher' as NavIconName, compact: false },
  { name: 'appSwitcher' as NavIconName, compact: false, variant: 'foregroundMuted' },
  { name: 'appSwitcher' as NavIconName, disabled: true },
] as const;

export const All = () => (
  <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {navigationIconButtonVariants.map((props, idx) => {
      const key = `nav-icon-${idx}`;
      return (
        <NavigationIconButton
          key={key}
          accessibilityLabel="App switcher"
          onClick={onClickConsole}
          {...props}
        />
      );
    })}
  </VStack>
);
