import { paletteCssVarsMap } from './paletteCssVarsMap';
import { UsePaletteFn } from './types';

export const usePalette: UsePaletteFn = () => {
  return paletteCssVarsMap;
};
