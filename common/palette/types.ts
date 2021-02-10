import { ReadonlyDeep } from 'type-fest';

import { SpectrumAlias, SpectrumAliasWithOpacity } from '../spectrum/types';
import { defaultPalette, paletteBackgrounds, paletteForegrounds } from './constants';

export type PaletteAlias = keyof typeof defaultPalette;
export type PaletteValue = SpectrumAlias | SpectrumAliasWithOpacity;
export type PaletteForeground = Extract<PaletteAlias, typeof paletteForegrounds[number]>;
export type PaletteBackground = Extract<PaletteAlias, typeof paletteBackgrounds[number]>;
export type InternalPaletteConfig = ReadonlyDeep<Record<PaletteAlias, PaletteValue>>;
export type PaletteConfig = { [key in PaletteAlias]?: PaletteValue };
export type Palette = Record<PaletteAlias, string>;
// Web returns CSS variables and RN returns actual rgb values
export type UsePaletteFn = () => Palette;
