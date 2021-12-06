import {
  iconSheetBuilder,
  CreateIconSheetParams,
} from '@cbhq/cds-common/internal/iconSheetBuilder';
import { HStack } from '../../layout';
import { Icon } from '../Icon';
import { ThemeProvider } from '../../system/ThemeProvider';

export default {
  title: 'Core Components/Icon Sheet',
  component: Icon,
};

export const { IconSheet } = iconSheetBuilder({
  Icon,
  HStack,
  ThemeProvider,
} as CreateIconSheetParams);
