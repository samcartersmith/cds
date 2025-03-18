import React from 'react';
import type { NavIconName } from '@cbhq/cds-icons';

import { NavigationIconButton } from '../NavigationIconButton';
import { VStack } from '../../layout';

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
];

export const All = () => (
  <VStack padding={0.5} gap={2} flexWrap="nowrap" alignItems="flex-start">
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
