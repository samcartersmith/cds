import { kebabCase, mapKeys, mapValues, pascalCase, toCssVar, toCssVarFn } from '@cds/utils';
import {
  typographyConfig,
  TypographyConfig,
  cssFontFamilies,
} from 'eng/shared/design-system/codegen/configs/typographyConfig';

import { DEFAULT_SCALE, scaleConfig } from '../configs/scaleConfig';
import { calculateLetterSpacing, calculateMinFontSize, round } from './utils';

const calculateVariantStyle = (
  {
    baseFontSize,
    fontFamily,
    fontWeight,
    allowAllCaps,
    disableMinimums,
    leading,
    xHeight,
  }: TypographyConfig,
  scaleConversion: number,
  { unitless }: { unitless: boolean }
) => {
  // Proposed font size by scale
  const rawFontSize = baseFontSize + scaleConversion;
  const roundedLineHeight = round(rawFontSize + leading);
  const defaultFontSize = unitless ? rawFontSize : `${rawFontSize}px`;
  const defaultLineHeight = unitless ? roundedLineHeight : `${roundedLineHeight}px`;
  const defaultLetterSpacing = calculateLetterSpacing(rawFontSize, unitless);

  // check to see what minimum font sizes are for lowercase and upper case letters
  const minLowerCaseFontSize = Math.ceil(calculateMinFontSize(xHeight));
  const minLowercaseLineHeight = round(minLowerCaseFontSize + leading);
  const minLowercaseLetterSpacing = calculateLetterSpacing(minLowerCaseFontSize, unitless);

  const minUpperCaseFontSize = Math.ceil(calculateMinFontSize(1));
  const minUpperCaseLineHeight = round(minUpperCaseFontSize + leading);
  const minUpperCaseLetterSpacing = calculateLetterSpacing(minUpperCaseFontSize, unitless);

  const sharedProps = {
    fontWeight,
    ...(unitless ? { fontFamily } : {}),
  };

  const lowercase = {
    fontSize: defaultFontSize,
    lineHeight: defaultLineHeight,
    letterSpacing: defaultLetterSpacing,
    ...sharedProps,
  };

  const allCaps = {
    ...lowercase,
    textTransform: 'uppercase',
  };

  const adjustedLowercase = {
    fontSize: unitless ? minLowerCaseFontSize : `${minLowerCaseFontSize}px`,
    lineHeight: unitless ? minLowercaseLineHeight : `${minLowercaseLineHeight}px`,
    letterSpacing: minLowercaseLetterSpacing,
    ...sharedProps,
  };

  const adjustedUppercase = {
    fontSize: unitless ? minUpperCaseFontSize : `${minUpperCaseFontSize}px`,
    lineHeight: unitless ? minUpperCaseLineHeight : `${minUpperCaseLineHeight}px`,
    textTransform: 'uppercase',
    letterSpacing: minUpperCaseLetterSpacing,
    ...sharedProps,
  };

  const lowercasePasses = rawFontSize >= minLowerCaseFontSize;
  const uppercasePasses = rawFontSize >= minUpperCaseFontSize;

  if (lowercasePasses) {
    return lowercase;
  } else if (!lowercasePasses && uppercasePasses && allowAllCaps) {
    return allCaps;
  } else if (!lowercasePasses && !allowAllCaps && !disableMinimums) {
    return adjustedLowercase;
  } else if (disableMinimums) {
    return lowercase;
  }
  return adjustedUppercase;
};

// Codegen data
export const typographyScaleMapWithoutUnits = mapValues(scaleConfig, scaleNumber =>
  mapValues(typographyConfig, config =>
    calculateVariantStyle(config, scaleNumber, { unitless: true })
  )
);

export const typographyScaleMapWithUnits = mapValues(scaleConfig, scaleNumber =>
  mapValues(typographyConfig, config =>
    mapKeys(calculateVariantStyle(config, scaleNumber, { unitless: false }), (_, cssProperty) =>
      kebabCase(cssProperty)
    )
  )
);

export const typographyScaleMapWithCssVariables = mapValues(scaleConfig, (_, scaleName) => {
  const textVariants = mapValues(
    typographyScaleMapWithUnits[scaleName],
    (stylesObject, variantName) =>
      mapKeys(stylesObject, (_, cssProperty) => toCssVar(`${variantName}-${cssProperty}` as const))
  );

  return Object.entries(textVariants).reduce((prev, [_, next]) => {
    return {
      ...prev,
      ...next,
    };
  }, {} as typeof textVariants[keyof typeof textVariants]);
});

export const typographyCss = mapValues(
  typographyScaleMapWithUnits[DEFAULT_SCALE],
  (stylesObject, variantName) => ({
    ...mapValues(stylesObject, (_, cssProperty) =>
      toCssVarFn(`${variantName}-${cssProperty}` as const)
    ),
    'font-family': cssFontFamilies[typographyConfig[variantName]['fontFamily']],
  })
);

export const typographyPascalCaseConfig = mapKeys(typographyConfig, (_, variantName) =>
  pascalCase(variantName)
);
