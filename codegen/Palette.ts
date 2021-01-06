import {
  defaultPalette,
  paletteForegrounds,
  paletteBackgrounds,
} from '@cds/theme/palette/constants';
import { PaletteAlias } from '@cds/theme/palette/types';
import { mapValues, toCssVarFn } from '@cds/utils';

const arrayToObject = <T extends string>(arr: T[] | Readonly<T[]>) =>
  [...arr].reduce((prev, next) => {
    return {
      ...prev,
      [`${next}`]: next,
    };
  }, {} as { [key in T]: key });

const foregroundMap = arrayToObject(paletteForegrounds);
const backgroundMap = arrayToObject(paletteBackgrounds);

const cssVariables = mapValues(defaultPalette, (_, key) => toCssVarFn(key));

const cssBackgroundColor = mapValues(backgroundMap, (_, key) => {
  return {
    'background-color': toCssVarFn(key),
  };
});

const cssBorderColor = mapValues(backgroundMap, (_, key) => {
  return {
    'border-color': toCssVarFn(key),
  };
});

const cssColor = mapValues(foregroundMap, (_, key) => {
  return {
    color: toCssVarFn(key),
  };
});

export const Palette = {
  cssBackgroundColor,
  cssBorderColor,
  cssColor,
  cssVariables,
  validate: () => {
    const aliases = Object.keys(defaultPalette) as PaletteAlias[];
    aliases.forEach((item: PaletteAlias) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!paletteBackgrounds.includes(item) && !paletteForegrounds.includes(item)) {
        throw new Error(
          `The palette alias, ${item}, was added but neither paletteForegrounds or paletteBackgrounds was updated to include it.`
        );
      }
    });
  },
} as const;
