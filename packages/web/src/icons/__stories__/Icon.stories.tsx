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
export const Sheet1 = () => <IconSheet endIndex={120} startIndex={0} />;
export const Sheet2 = () => <IconSheet endIndex={240} startIndex={120} />;
export const Sheet3 = () => <IconSheet endIndex={360} startIndex={240} />;
export const Sheet4 = () => <IconSheet endIndex={480} startIndex={360} />;
export const Sheet5 = () => <IconSheet endIndex={600} startIndex={480} />;
