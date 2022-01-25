import { KebabCase } from 'type-fest';

import { PaletteAlias, PaletteValue, PartialPaletteConfig } from './Palette';
import { Spectrum } from './Spectrum';

/** TODO: Remove `hasFrontier` arg when frontierColor is sunset */
type HasFrontier = boolean;
export type PaletteFn<InputType, ReturnType> = (
  input: InputType,
  spectrum: Spectrum,
  hasFrontier?: HasFrontier,
) => ReturnType;

type PaletteCssVariableValue = `var(--${KebabCase<PaletteAlias>})`;
export type GradientArray = { offset: string; color: string }[];
export type RgbArray = [number, number, number];
export type RgbaArray =
  | [number, number, number, number]
  | Readonly<[number, number, number, number]>;
export type RgbString = `${string},${string},${string}`;
export type PaletteValueToRgbaArray = PaletteFn<PaletteValue, RgbaArray>;
export type PaletteValueToRgbaString = PaletteFn<PaletteValue, string>;
export type PaletteValueToHex = PaletteFn<PaletteValue, string>;
export type PaletteAliasToRgbaString = PaletteFn<PaletteAlias, string>;
export type PaletteConfigToRgbaStrings = PaletteFn<
  PartialPaletteConfig,
  Record<PaletteAlias, string>
>;
export type PaletteConfigToHexValues = PaletteFn<
  PartialPaletteConfig,
  Record<PaletteAlias, string>
>;
export type A11yColorUsage = 'largeText' | 'normalText' | 'graphic';
export type AccessibleForegroundParams = {
  /** @danger Only use if you absolutely have to, like when an asset color is powering the background color. Accepts any valid color (hex, rgb, rgba). */
  background?: string;
  /** Any valid color (hex, rgb, rgba). */
  color: Exclude<string, PaletteCssVariableValue> | 'auto';
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage;
};
export type AccessibleForegroundFn = (params: AccessibleForegroundParams) => string;
export type AccessibleForegroundGradientFn = (params: AccessibleForegroundParams) => GradientArray;
export type PaletteValueToRgbaStringFn = (value: PaletteValue) => string;
export type SpectrumConditionalConfig<T, K> = {
  light: T;
  dark: K;
};
