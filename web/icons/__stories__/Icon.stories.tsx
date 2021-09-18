import { createIconSheet, CreateIconSheetParams } from ':cds-storybook/stories/IconSheet';
import { HStack } from '../../layout';
import { Icon } from '../Icon';
import { ThemeProvider } from '../../system/ThemeProvider';

export default {
  title: 'Core Components/Icon Sheet',
  component: Icon,
};

export const { IconSheet } = createIconSheet({
  Icon,
  HStack,
  ThemeProvider,
} as CreateIconSheetParams);
