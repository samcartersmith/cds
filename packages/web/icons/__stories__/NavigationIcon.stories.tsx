import { NavigationIcon } from '../NavigationIcon';

import { NavigationIconSheet } from './NavigationIconSheet';

export default {
  title: 'NavigationIcon',
  component: NavigationIcon,
};

// TODO: figure out a way to handle this split dynamically, maybe add a codegen script that executes as part of release script
// single icon sheet is too large for percy, need to split them up in chunks of 80 to stay under limit
export const Sheet1 = () => <NavigationIconSheet endIndex={80} />;
export const Sheet2 = () => <NavigationIconSheet startIndex={80} endIndex={160} />;
