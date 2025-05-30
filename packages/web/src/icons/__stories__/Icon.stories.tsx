/**
 * DO NOT MODIFY
 * Generated from yarn nx run icons:generate-stories
 */

import { Icon } from '../Icon';

import { IconSheet } from './IconSheet';

export default {
  title: 'Icon',
  component: Icon,
};

// single sheet is too large for Percy, need to split up in chunks of 160 to stay under resource limit
export const Sheet1 = () => <IconSheet endIndex={160} startIndex={0} />;
export const Sheet2 = () => <IconSheet endIndex={320} startIndex={160} />;
