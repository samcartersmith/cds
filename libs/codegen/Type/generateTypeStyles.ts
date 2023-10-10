import { fromPairs } from 'lodash';
import {
  entries,
  kebabCase,
  mapKeys,
  mapValues,
  pascalCase,
  toCssVar,
  toCssVarFn,
} from '@cbhq/cds-utils/index';

import { scaleConfig } from '../configs/scaleConfig';
import {
  fallbackStack,
  fontFamilies,
  fontWeights,
  TypographyConfig,
  typographyConfig,
  xHeight,
} from '../configs/typographyConfig';

import { calculateMinFontSize, round } from './utils';

type FontFamilies = typeof fontFamilies;
type FontWeights = typeof fontWeights;
type FontWeightName = keyof FontWeights;
type FontWeight = FontWeights[FontWeightName];
type FontFamily = FontFamilies[keyof FontFamilies]['fontFamily'];
type FontFamilyMobile = `${FontFamily}-${FontWeightName}`;

type TypographyStyles = {
  fontFamily?: FontFamilyMobile | string;
  // Mobile doesn't need font weight because the font family should include the weight
  fontWeight?: FontWeight;
  fontSize: string | number;
  textTransform?: string;
  lineHeight: string | number;
};

function getFontFamilyName(size: number | string) {
  const sizeAsNumber: number = typeof size === 'string' ? parseFloat(size.replace('px', '')) : size;
  if (sizeAsNumber >= fontFamilies.display.minimum) {
    return 'display';
  }
  if (sizeAsNumber >= fontFamilies.sans.minimum) {
    return 'sans';
  }
  return 'text';
}

const fallbackCssId = `cds-font-fallback`;
const fontFamilyCssVars = mapValues(fontFamilies, (value) => {
  const name = `cds-font-${value.name}` as const;
  return {
    setter: [toCssVar(name), `${value.fontFamily}, ${toCssVarFn(fallbackCssId)}`] as [
      string,
      string,
    ],
    getter: toCssVarFn(name),
  };
});

function getFontFamilyStyles(size: number | string, fontWeight: FontWeightName, mobile: boolean) {
  const familyName = getFontFamilyName(size);
  if (mobile) {
    const config = fontFamilies[familyName];
    return { fontFamily: `${config.fontFamily}-${fontWeight}` as const };
  }
  const fontFamily = fontFamilyCssVars[familyName].getter;
  return { fontWeight: fontWeights[fontWeight], fontFamily };
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

  const lowercasePasses = rawFontSize >= minLowerCaseFontSize;

  let styles: TypographyStyles = {
    fontSize: defaultFontSize,
    lineHeight: defaultLineHeight,
  };
  if (!lowercasePasses && !allowAllCaps && !disableMinimums) {
    styles = {
      fontSize: mobile ? minLowerCaseFontSize : `${minLowerCaseFontSize}px`,
      lineHeight: mobile ? minLowercaseLineHeight : `${minLowercaseLineHeight}px`,
    };
  } else {
    styles = {
      fontSize: defaultFontSize,
      lineHeight: defaultLineHeight,
    };
  }

  return {
    ...styles,
    ...getFontFamilyStyles(styles.fontSize, fontWeight, !!mobile),
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
  }, {} as (typeof textVariants)[keyof typeof textVariants]);
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

export const fontFamilyCssVariables = mapValues(fontFamilyCssVars, (val) => val.getter);
export const fontFaceCss = {
  fonts: entries(fontFamilies).map(([, value]) => value.fontFamily),
  css: {
    ':root': fromPairs([
      [toCssVar(fallbackCssId), fallbackStack] as [string, string],
      ...Object.values(fontFamilyCssVars).map((item) => item.setter),
    ]),
  },
};
export const fontFamilyMobileTokens = mapValues(fontFamilies, (val) => val.fontFamily);
