import { VStack } from '../../layout/VStack';
import { SelectOptionCell } from '../../cells/SelectOptionCell';
import { ThemeProvider } from '../../system/ThemeProvider';
import { SelectInput } from '../SelectInput';
import { createStories, CreateSelectInputStoriesProps } from ':cds-storybook/stories/SelectInput';

export default {
  title: 'Core Components/Inputs/SelectInput',
  component: SelectInput,
};

export const { Default, InputStackOptions, WithLabel, Compact, Variants } = createStories({
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
} = createStories({
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
} = createStories({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
  scale: 'xSmall',
} as CreateSelectInputStoriesProps);
