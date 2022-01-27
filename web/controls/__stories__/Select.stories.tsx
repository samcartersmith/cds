import { selectBuilder, CreateSelectStoriesProps } from '@cbhq/cds-common/internal/selectBuilder';

import { VStack } from '../../layout/VStack';
import { SelectOption } from '../SelectOption';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Select } from '../Select';
import { MenuItem } from '../../overlays/MenuItem';
import { InputIcon } from '../InputIcon';

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
  InputIcon,
};

export const { Default, InputStackOptions, Disabled, Compact, Variants } = selectBuilder(
  components as CreateSelectStoriesProps,
);

export const {
  Default: DarkMode,
  InputStackOptions: DarkInputStackOptions,
  Disabled: DarkDisabled,
  Compact: DarkCompact,
  Variants: DarkVariants,
} = selectBuilder({
  ...components,
  spectrum: 'dark',
} as CreateSelectStoriesProps);

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  Disabled: DenseDisabled,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectBuilder({
  ...components,
  scale: 'xSmall',
} as CreateSelectStoriesProps);
