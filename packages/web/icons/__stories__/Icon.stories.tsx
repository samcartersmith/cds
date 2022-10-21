/**
 * DO NOT MODIFY
 * Generated from packages/codegen/stories/createIconStories.ts
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

export const Sheet0 = () => IconSheet(0, 50);
export const Sheet1 = () => IconSheet(50, 100);
export const Sheet2 = () => IconSheet(100, 150);
export const Sheet3 = () => IconSheet(150, 200);
export const Sheet4 = () => IconSheet(200, 250);
export const Sheet5 = () => IconSheet(250, 300);
export const Sheet6 = () => IconSheet(300, 350);
export const Sheet7 = () => IconSheet(350, 400);
