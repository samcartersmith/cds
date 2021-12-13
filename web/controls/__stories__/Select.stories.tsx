import { selectBuilder, CreateSelectStoriesProps } from '@cbhq/cds-common/internal/selectBuilder';

import { VStack } from '../../layout/VStack';
import { SelectOption } from '../../cells/SelectOption';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Select } from '../Select';
import { MenuItem } from '../../overlays/MenuItem';

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
  components as CreateSelectStoriesProps,
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
} as CreateSelectStoriesProps);

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  WithLabel: DenseWithLabel,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectBuilder({
  ...components,
  scale: 'xSmall',
} as CreateSelectStoriesProps);
