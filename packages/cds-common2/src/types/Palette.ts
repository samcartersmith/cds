import { ThemeVars } from '../new/vars';

export type PaletteValue = ThemeVars.SpectrumColor | [ThemeVars.SpectrumColor, number];
export type PaletteValueTuple = [ThemeVars.SpectrumColor, number];
// Web returns CSS variables and RN returns actual rgb values
export type UsePaletteFn = () => Record<ThemeVars.Color, string>;
