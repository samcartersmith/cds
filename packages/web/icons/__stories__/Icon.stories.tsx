/* eslint-disable @typescript-eslint/naming-convention */

/**
 * DO NOT MODIFY
 * Generated from packages/codegen/createIconStories/main.ts
 */

import {
  CreateIconSheetParams,
  iconSheetBuilderWeb,
} from '@cbhq/cds-common/internal/iconSheetBuilderWeb';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

export default {
  title: 'Icon',
  component: Icon,
};

const { IconSheet } = iconSheetBuilderWeb({
  platform: 'web',
  VStack,
  HStack,
  Icon,
} as CreateIconSheetParams);

export const ui_0 = () => IconSheet('ui', 0, 50);
export const ui_1 = () => IconSheet('ui', 50, 100);
export const ui_2 = () => IconSheet('ui', 100, 150);
export const ui_3 = () => IconSheet('ui', 150, 200);
export const ui_4 = () => IconSheet('ui', 200, 250);
export const ui_5 = () => IconSheet('ui', 250, 300);
export const nav_0 = () => IconSheet('nav', 0, 50);
export const nav_1 = () => IconSheet('nav', 50, 100);
export const nav_2 = () => IconSheet('nav', 100, 150);
