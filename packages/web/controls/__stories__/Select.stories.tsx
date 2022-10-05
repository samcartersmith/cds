import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';
import { CreateSelectStoriesProps, selectBuilder } from '@cbhq/cds-common/internal/selectBuilder';

import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Inputs/Select',
  component: Select,
  excludeStories: [
    'HundredCDSSelectComponents',
    'HundredNativeSelectComponents',
    'ThousandCDSSelectComponents',
    'ThousandNativeSelectComponents',
  ],
};

const components = {
  Select,
  VStack,
  SelectOption,
  ThemeProvider,
  InputIcon,
};

export const { Default, InputStackOptions, Disabled, Compact, Variants } = selectBuilder(
  components as unknown as CreateSelectStoriesProps,
);

Disabled.bind({});
/** TODO: convert to CSF (Component Story Format v3) */
// @ts-expect-error In storybook we can copy functions with bind and attach parameters.
Disabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const SmallSelect = () => <Default width={80} />;

export const {
  Default: DarkMode,
  InputStackOptions: DarkInputStackOptions,
  Disabled: DarkDisabled,
  Compact: DarkCompact,
  Variants: DarkVariants,
} = selectBuilder({
  ...components,
  spectrum: 'dark',
} as unknown as CreateSelectStoriesProps);

DarkDisabled.bind({});
/** TODO: convert to CSF (Component Story Format v3) */
// @ts-expect-error In storybook we can copy functions with bind and attach parameters.
DarkDisabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const {
  Default: Dense,
  InputStackOptions: DenseInputStackOptions,
  Disabled: DenseDisabled,
  Compact: DenseCompact,
  Variants: DenseVariants,
} = selectBuilder({
  ...components,
  scale: 'xSmall',
} as unknown as CreateSelectStoriesProps);

DenseDisabled.bind({});
/** TODO: convert to CSF (Component Story Format v3) */
// @ts-expect-error In storybook we can copy functions with bind and attach parameters.
DenseDisabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

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
