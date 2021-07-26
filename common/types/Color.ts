import { PaletteValue } from './Palette';
import { Spectrum } from './Spectrum';

export type GradientArray = { offset: string; color: string }[];
export type RgbArray = [number, number, number];
export type RgbaArray = [number, number, number, number];
export type RgbString = `${string},${string},${string}`;
export type PaletteValueToRgbaArray = (paletteValue: PaletteValue, spectrum: Spectrum) => RgbaArray;
export type PaletteValueToRgbaString = (paletteValue: PaletteValue, spectrum: Spectrum) => string;
export type A11yColorUsage = 'largeText' | 'normalText' | 'graphic';
export type AccessibleForegroundParams = {
  /** Any valid color (hex, rgb, rgba). */
  color: string;
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage;
};
export type AccessibleForegroundFn = (params: AccessibleForegroundParams) => string;
export type AccessibleForegroundGradientFn = (params: AccessibleForegroundParams) => GradientArray;
export type PaletteValueToRgbaStringFn = (value: PaletteValue) => string;
