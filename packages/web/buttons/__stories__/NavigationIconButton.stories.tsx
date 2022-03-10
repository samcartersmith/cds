import { buttonBuilder } from '@cbhq/cds-common/internal/buttonBuilder';

import { NavigationIconButton } from '../NavigationIconButton';

const { build, buildSheet } = buttonBuilder(NavigationIconButton, {
  args: { frontier: true, name: 'appSwitcher' },
});

export const Default = build();
export const All = buildSheet([
  { name: 'appSwitcher', variant: 'secondary' },
  { name: 'appSwitcher', variant: 'foregroundMuted' },
  { name: 'appSwitcher', compact: false },
  { name: 'appSwitcher', compact: false, variant: 'foregroundMuted' },
  { name: 'appSwitcher', disabled: true },
]);

export default {
  title: 'Core Components/Buttons/NavigationIconButton (Frontier)',
  component: NavigationIconButton,
};
