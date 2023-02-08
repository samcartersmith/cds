/* eslint-disable @typescript-eslint/naming-convention */

import { Icon } from '../Icon';

import { IconSheet } from './deprecatedIconSheetBuilder';
import { IconSheet as NewIconSheet } from './IconSheet';

export default {
  title: 'Icon',
  component: Icon,
};

export const All = () => <NewIconSheet />;

/* -------------------------------------------------------------------------- */
/*           Everything below should be deleted after icon migration          */
/* -------------------------------------------------------------------------- */

export const ui_0 = () => IconSheet('ui', 0, 50);
export const ui_1 = () => IconSheet('ui', 50, 100);
export const ui_2 = () => IconSheet('ui', 100, 150);
export const ui_3 = () => IconSheet('ui', 150, 200);
export const ui_4 = () => IconSheet('ui', 200, 250);
export const ui_5 = () => IconSheet('ui', 250, 300);
export const nav_0 = () => IconSheet('nav', 0, 50);
export const nav_1 = () => IconSheet('nav', 50, 100);
export const nav_2 = () => IconSheet('nav', 100, 150);
