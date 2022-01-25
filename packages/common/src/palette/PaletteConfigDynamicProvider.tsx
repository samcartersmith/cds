import React, { memo, useMemo } from 'react';
import { generateRandomId, isDevelopment } from '@cbhq/cds-utils';

import { createThemeConfig } from '../system/createThemeConfig';
import { ThemeConfigDynamicProvider } from '../system/ThemeConfigDynamicProvider';
import { useFeatureFlags } from '../system/useFeatureFlags';
import { PartialPaletteConfig } from '../types';

export type PaletteConfigDynamicProviderProps = {
  value: PartialPaletteConfig;
  /** A unique name for the palette.
   * This is used to optimize when dynamically merging two palettes at runtime.
   * If the same two palettes are merged more than once than it will pull from a cached object.
   */
  name?: string;
};

/**
 * Only used for custom non CDS palette configs which do not have a theme config generated from CDS.
 * This is the least performant method for theming in CDS since conversions to rgba strings and hex values has
 * to be done at runtime. For entire themes which have been codegenerated, use ThemeConfigProvider.
 * */
export const PaletteConfigDynamicProvider: React.FC<PaletteConfigDynamicProviderProps> = memo(
  ({ value, name, children }) => {
    const hasFrontier = useFeatureFlags().frontierColor;
    const newThemeConfig = useMemo(() => {
      if (isDevelopment() && !name) {
        // eslint-disable-next-line no-console
        console.log(
          `CDS now offers performance optimizations when using custom palettes.
            To get these optimizations, add a 'name' prop to the ThemeProvider with the custom palette.`,
        );
      }
      return createThemeConfig({
        palette: value,
        hasFrontier,
        name: name ?? generateRandomId('theme'),
      });
    }, [hasFrontier, name, value]);
    return (
      <ThemeConfigDynamicProvider value={newThemeConfig}>{children}</ThemeConfigDynamicProvider>
    );
  },
);

PaletteConfigDynamicProvider.displayName = 'PaletteConfigDynamicProvider';
