import React from 'react';
import { performanceBenchmarkBuilder } from '@cbhq/cds-common/internal/performanceBenchmarkBuilder';
import { CreateSelectStoriesProps, selectBuilder } from '@cbhq/cds-common/internal/selectBuilder';

import { DotSymbol } from '../../dots';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Select/Select',
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
  DotSymbol,
  RemoteImage,
  Box,
};

export const {
  Default,
  LongTextSelect,
  AssetSelect,
  InputStackOptions,
  Disabled,
  Compact,
  Variants,
  LongText,
} = selectBuilder(components as unknown as CreateSelectStoriesProps);

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
  AssetSelect: DarkAssetSelect,
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
  AssetSelect: DenseAssetSelect,
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
