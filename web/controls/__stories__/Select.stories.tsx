import { selectBuilder, CreateSelectStoriesProps } from '@cbhq/cds-common/internal/selectBuilder';

import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';
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

const NativeSelect = () => {
  return (
    <select id="cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  );
};

export const {
  HundredCDSComponents: HundredCDSSelectComponents,
  HundredHTMLComponent: HundredNativeSelectComponents,
  ThousandCDSComponents: ThousandCDSSelectComponents,
  ThousandHTMLComponent: ThousandNativeSelectComponents,
} = performanceBenchmarkBuilder(Compact, NativeSelect);
