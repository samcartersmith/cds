import { CreateSelectStoriesProps, selectBuilder } from '@cbhq/cds-common/internal/selectBuilder';

import { VStack } from '../../layout/VStack';
import { MenuItem } from '../../overlays/MenuItem';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Inputs/Select',
  component: Select,
};

const components = {
  Select,
  MenuItem,
  VStack,
  SelectOption,
  ThemeProvider,
};

export const { Default, InputStackOptions, WithLabel, Compact, Variants } = selectBuilder(
  components as unknown as CreateSelectStoriesProps,
);

export const {
  Default: DarkMode,
  InputStackOptions: DarkInputStackOptions,
  WithLabel: DarkWithLabel,
  Compact: DarkCompact,
  Variants: DarkVariants,
} = selectBuilder({
  ...components,
  spectrum: 'dark',
} as unknown as CreateSelectStoriesProps);

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  WithLabel: DenseWithLabel,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectBuilder({
  ...components,
  scale: 'xSmall',
} as unknown as CreateSelectStoriesProps);
