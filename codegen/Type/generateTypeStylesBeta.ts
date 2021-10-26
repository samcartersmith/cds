import { kebabCase, mapKeys, mapValues, pascalCase, toCssVar, toCssVarFn } from '@cbhq/cds-utils';
import {
  typographyConfig,
  TypographyConfig,
  fontFamilies,
  fontWeights,
  xHeight,
} from '../configs/typographyConfigBeta';

import { scaleConfig } from '../configs/scaleConfig';
import { calculateMinFontSize, round } from './utils';

type FontFamilies = typeof fontFamilies;
type FontWeights = typeof fontWeights;
type FontWeightName = keyof FontWeights;
type FontWeight = FontWeights[FontWeightName];
type FontFamily = FontFamilies[keyof FontFamilies]['fontFamily'];
type FontFamilyWeb = FontFamilies[keyof FontFamilies]['stack'];
type FontFamilyMobile = `${FontFamily}-${FontWeightName}`;

type TypographyStyles = {
  fontFamily?: FontFamilyMobile | FontFamilyWeb;
  // Mobile doesn't need font weight because the font family should include the weight
  fontWeight?: FontWeight;
  fontSize: string | number;
  textTransform?: string;
  lineHeight: string | number;
};

function getFontFamilyConfig(size: number | string) {
  const sizeAsNumber: number = typeof size === 'string' ? parseFloat(size.replace('px', '')) : size;
  if (sizeAsNumber >= fontFamilies.display.minimum) {
    return fontFamilies.display;
  }
  if (sizeAsNumber >= fontFamilies.sans.minimum) {
    return fontFamilies.sans;
  }
  return fontFamilies.text;
}

function getFontFamilyStyles(size: number | string, fontWeight: FontWeightName, mobile: boolean) {
  const config = getFontFamilyConfig(size);
  if (mobile) {
    return { fontFamily: `${config.fontFamily}-${fontWeight}` as const };
  }
  return { fontWeight: fontWeights[fontWeight], fontFamily: config.stack };
}

const calculateVariantStyle = (
  { baseFontSize, fontWeight, allowAllCaps, disableMinimums, leading }: TypographyConfig,
  scaleConversion: number,
  { mobile }: { mobile: boolean } = { mobile: false },
) => {
  // Proposed font size by scale
  const rawFontSize = baseFontSize + scaleConversion;
  const roundedLineHeight = round(rawFontSize + leading);
  const defaultFontSize = mobile ? rawFontSize : `${rawFontSize}px`;
  const defaultLineHeight = mobile ? roundedLineHeight : `${roundedLineHeight}px`;

  // check to see what minimum font sizes are for lowercase and upper case letters
  const minLowerCaseFontSize = Math.ceil(calculateMinFontSize(xHeight.text));
  const minLowercaseLineHeight = round(minLowerCaseFontSize + leading);

  const minUpperCaseFontSize = Math.ceil(calculateMinFontSize(1));
  const minUpperCaseLineHeight = round(minUpperCaseFontSize + leading);

  const lowercase = {
    fontSize: defaultFontSize,
    lineHeight: defaultLineHeight,
  };

  const allCaps = {
    ...lowercase,
    textTransform: 'uppercase',
  };

  const adjustedLowercase = {
    fontSize: mobile ? minLowerCaseFontSize : `${minLowerCaseFontSize}px`,
    lineHeight: mobile ? minLowercaseLineHeight : `${minLowercaseLineHeight}px`,
  };

  const adjustedUppercase = {
    fontSize: mobile ? minUpperCaseFontSize : `${minUpperCaseFontSize}px`,
    lineHeight: mobile ? minUpperCaseLineHeight : `${minUpperCaseLineHeight}px`,
    textTransform: 'uppercase',
  };

  const lowercasePasses = rawFontSize >= minLowerCaseFontSize;
  const uppercasePasses = rawFontSize >= minUpperCaseFontSize;

  let styles: TypographyStyles = adjustedUppercase;
  if (lowercasePasses) {
    styles = lowercase;
  } else if (!lowercasePasses && uppercasePasses && allowAllCaps) {
    styles = allCaps;
  } else if (!lowercasePasses && !allowAllCaps && !disableMinimums) {
    styles = adjustedLowercase;
  } else if (disableMinimums) {
    styles = lowercase;
  }

  return {
    ...styles,
    ...getFontFamilyStyles(styles.fontSize, fontWeight, mobile),
  };
};

// Codegen data
export const typographyScaleMapForMobile = mapValues(scaleConfig, (scaleNumber) =>
  mapValues(typographyConfig, (config) =>
    calculateVariantStyle(config, scaleNumber, { mobile: true }),
  ),
);

export const typographyScaleMapForWeb = mapValues(scaleConfig, (scaleNumber) =>
  mapValues(typographyConfig, (config) =>
    mapKeys(calculateVariantStyle(config, scaleNumber), (_, cssProperty) => kebabCase(cssProperty)),
  ),
);

export const typographyScaleMapWithCssVariables = mapValues(scaleConfig, (_, scaleName) => {
  const textVariants = mapValues(typographyScaleMapForWeb[scaleName], (stylesObject, variantName) =>
    mapKeys(stylesObject, (_2, cssProperty) => toCssVar(`${variantName}-${cssProperty}` as const)),
  );

  return Object.entries(textVariants).reduce((prev, [, next]) => {
    return {
      ...prev,
      ...next,
    };
  }, {} as typeof textVariants[keyof typeof textVariants]);
});

export const typographyCss = mapValues(
  // Smaller scales (< large) have uppercase text-transform for small font size typography styles.
  // We want to make sure the generated textStyles include those declarations.
  typographyScaleMapForWeb.xSmall,
  (stylesObject, variantName) => ({
    ...mapValues(stylesObject, (_, cssProperty) =>
      toCssVarFn(`${variantName}-${cssProperty}` as const),
    ),
    'font-family': toCssVarFn(`${variantName}-font-family`),
  }),
);

export const typographyPascalCaseConfig = mapKeys(typographyConfig, (_, variantName) =>
  pascalCase(variantName),
);
