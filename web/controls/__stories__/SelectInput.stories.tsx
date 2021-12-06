import {
  selectInputBuilder,
  CreateSelectInputStoriesProps,
} from '@cbhq/cds-common/internal/selectInputBuilder';

import { VStack } from '../../layout/VStack';
import { SelectOptionCell } from '../../cells/SelectOptionCell';
import { ThemeProvider } from '../../system/ThemeProvider';
import { SelectInput } from '../SelectInput';

export default {
  title: 'Core Components/Inputs/SelectInput',
  component: SelectInput,
};

export const { Default, InputStackOptions, WithLabel, Compact, Variants } = selectInputBuilder({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
} as CreateSelectInputStoriesProps);

export const {
  Default: DarkMode,
  InputStackOptions: DarkInputStackOptions,
  WithLabel: DarkWithLabel,
  Compact: DarkCompact,
  Variants: DarkVariants,
} = selectInputBuilder({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
  spectrum: 'dark',
} as CreateSelectInputStoriesProps);

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  WithLabel: DenseWithLabel,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectInputBuilder({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
  scale: 'xSmall',
} as CreateSelectInputStoriesProps);
