import type { PartialPaletteConfig } from './Palette';
import type { Scale } from './Scale';
import type { Spectrum } from './Spectrum';

export type ThemeProviderBaseProps = {
  /**
   * Determines which sizes to pull for typography, spacing, icons, and layout,
   * and is based on an applications information density.
   * @default large
   */
  scale?: Scale;
  /**
   * Determines which spectrum a palette will pull from. For example, in the light spectrum,
   * `gray100`, maps to black while in the dark spectrum `gray100` maps to white.
   * The default palette CDS ships with assigns foreground to `gray100`. `foreground`
   * is used as the default color in Text components.
   * @default light
   */
  spectrum?: Spectrum | null;
  /**
   * Takes a configurable palette. If a partial palette is provided it will be merged with the
   * closest parent `ThemeProvider` if present, if not it will be fallback to merging with the
   * default CDS palette.
   */
  palette?: PartialPaletteConfig;
};
