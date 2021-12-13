import {
  selectInputBuilder,
  CreateSelectInputStoriesProps,
} from '@cbhq/cds-common/internal/selectInputBuilder';

import { VStack } from '../../layout/VStack';
import { SelectOptionCell } from '../../cells/SelectOptionCell';
import { ThemeProvider } from '../../system/ThemeProvider';
import { SelectInput } from '../SelectInput';
import { MenuItem } from '../../overlays/MenuItem';

export default {
  title: 'Core Components/Inputs/SelectInput',
  component: SelectInput,
};

const components = {
  SelectInput,
  MenuItem,
  VStack,
  SelectOptionCell,
  ThemeProvider,
};

export const { Default, InputStackOptions, WithLabel, Compact, Variants } = selectInputBuilder(
  components as CreateSelectInputStoriesProps,
);

export const {
  Default: DarkMode,
  InputStackOptions: DarkInputStackOptions,
  WithLabel: DarkWithLabel,
  Compact: DarkCompact,
  Variants: DarkVariants,
} = selectInputBuilder({
  ...components,
  spectrum: 'dark',
} as CreateSelectInputStoriesProps);

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  WithLabel: DenseWithLabel,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectInputBuilder({
  ...components,
  scale: 'xSmall',
} as CreateSelectInputStoriesProps);
