export const baseTemplate = `/* eslint-disable @typescript-eslint/naming-convention */

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

`;
