/**
 * DO NOT MODIFY
 * Generated from yarn nx run icons:generate-stories
 */

import { NavigationIcon } from '../NavigationIcon';

import { NavigationIconSheet } from './NavigationIconSheet';

export default {
  title: 'NavigationIcon',
  component: NavigationIcon,
};

// single sheet is too large for Percy, need to split up in chunks of 80 to stay under resource limit
export const Sheet1 = () => <NavigationIconSheet endIndex={80} startIndex={0} />;
export const Sheet2 = () => <NavigationIconSheet endIndex={160} startIndex={80} />;
