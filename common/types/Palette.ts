import type { ReadonlyDeep } from 'type-fest';

import { defaultPalette, paletteBackgrounds, paletteForegrounds } from '../palette/constants';
import type { SpectrumAlias, SpectrumAliasWithOpacity } from './Spectrum';

export type PaletteAlias = keyof typeof defaultPalette;
export type PaletteValue = SpectrumAlias | SpectrumAliasWithOpacity;
export type PaletteForeground = Extract<PaletteAlias, typeof paletteForegrounds[number]>;
export type PaletteBackground = Extract<PaletteAlias, typeof paletteBackgrounds[number]>;
export type PaletteConfig = ReadonlyDeep<Record<PaletteAlias, PaletteValue>>;
export type PartialPaletteConfig = Partial<PaletteConfig>;
export type Palette = Record<PaletteAlias, string>;
// Web returns CSS variables and RN returns actual rgb values
export type UsePaletteFn = () => Palette;
