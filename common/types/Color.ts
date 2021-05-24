import { Spectrum, PaletteValue } from '.';

export type RgbArray = [number, number, number];
export type RgbaArray = [number, number, number, number];
export type PaletteValueToRgbaArray = (paletteValue: PaletteValue, spectrum: Spectrum) => RgbaArray;
export type PaletteValueToRgbaString = (paletteValue: PaletteValue, spectrum: Spectrum) => string;
export type A11yColorUsage = 'largeText' | 'normalText' | 'graphic';
