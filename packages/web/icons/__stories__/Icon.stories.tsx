import {
  CreateIconSheetParams,
  iconSheetBuilder,
} from '@cbhq/cds-common/internal/iconSheetBuilder';

import { HStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Icon } from '../Icon';

export default {
  title: 'Core Components/Icon Sheet',
  component: Icon,
};

export const { IconSheet } = iconSheetBuilder({
  Icon,
  HStack,
  ThemeProvider,
} as CreateIconSheetParams);
