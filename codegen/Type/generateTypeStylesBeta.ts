import { kebabCase, mapKeys, mapValues, pascalCase, toCssVar, toCssVarFn } from '@cbhq/cds-utils';
import {
  typographyConfig,
  TypographyConfig,
  fontWeights,
  FallbackStack,
  fallbackStack,
  FontFamily,
} from 'eng/shared/design-system/codegen/configs/typographyConfigBeta';

import { scaleConfig } from '../configs/scaleConfig';
import { calculateMinFontSize, round } from './utils';

type TypographyStyles = {
  fontFamily?: `${FontFamily}-${keyof typeof fontWeights}` | `${FontFamily}, ${FallbackStack}`;
  // Mobile doesn't need font weight because the font family should include the weight
  fontWeight?: typeof fontWeights[keyof typeof fontWeights];
  fontSize: string | number;
  textTransform?: string;
  lineHeight?: string | number;
};

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
  { mobile }: { mobile: boolean } = { mobile: false },
) => {
  // Proposed font size by scale
  const rawFontSize = baseFontSize + scaleConversion;
  const roundedLineHeight = round(rawFontSize + leading);
  const defaultFontSize = mobile ? rawFontSize : `${rawFontSize}px`;
  const defaultLineHeight = mobile ? roundedLineHeight : `${roundedLineHeight}px`;

  // check to see what minimum font sizes are for lowercase and upper case letters
  const minLowerCaseFontSize = Math.ceil(calculateMinFontSize(xHeight));
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

  if (mobile) {
    styles.fontFamily = `${fontFamily}-${fontWeight}` as const;
  } else {
    styles.fontWeight = fontWeights[fontWeight];
    styles.fontFamily = `${fontFamily}, ${fallbackStack}` as const;
  }

  return styles;
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

export const typographyCssBeta = mapValues(
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
