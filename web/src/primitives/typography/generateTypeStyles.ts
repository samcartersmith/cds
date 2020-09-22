import { scales } from '@cb/design-system-web/primitives/scale/scales';
import { UNIT_SPACE } from '@cb/design-system-web/primitives/spacing';
import {
  xHeight,
  TypeVariant,
  typographies,
} from '@cb/design-system-web/primitives/typography/typography';
import { decamelizeKeys, pascalize } from 'humps';

type GeneratedStyle = {
  name: string;
  // `decamelizeKeys` return type is object
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
};

export const getStyleName = (type: string, scaleName: string) =>
  `${type.toLowerCase()}${pascalize(scaleName)}`;

export const generateTypeStyles = (
  supportedScales: typeof scales,
  typesConfig: typeof typographies
): GeneratedStyle[] => {
  const generatedStyles: GeneratedStyle[] = [];
  Object.entries(supportedScales).forEach(([scaleName, scale]) => {
    Object.entries(typesConfig).forEach(([type, styleConfig]) => {
      generatedStyles.push({
        name: getStyleName(type, scaleName),
        style: decamelizeKeys(calculateVariantStyle(styleConfig, scale), { separator: '-' }),
      });
    });
  });

  return generatedStyles;
};

type DistributeProps = {
  value: number;
  rangeA: number[];
  rangeB: number[];
  limit?: boolean;
};

export const distribute = ({ value, rangeA, rangeB, limit = false }: DistributeProps) => {
  const [fromLow, fromHigh] = Array.from(rangeA);
  const [toLow, toHigh] = Array.from(rangeB);

  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
  if (!limit) return result;

  if (toLow < toHigh) {
    return result < toLow ? toLow : toHigh;
  } else {
    return result > toLow ? toLow : toHigh;
  }
};

/** Custom font fallback stack. The final stack will be concatenated with the system font stack */
const customFontFallback = {
  Graphik: 'Inter',
  Inter: 'Graphik',
};

const calculateVariantStyle = (
  { baseFontSize, fontFamily, fontWeight, allowAllCaps, disableMinimums, leading }: TypeVariant,
  scaleConversion: number
) => {
  // Proposed font size by scale
  const rawFontSize = baseFontSize + scaleConversion;

  // check to see what minimum font sizes are for lowercase and upper case letters
  const minLowerCaseFontSize = Math.ceil(calculateMinFontSize(xHeight[fontFamily]));
  const minUpperCaseFontSize = Math.ceil(calculateMinFontSize(1));

  const convertToEm = (value: number) => {
    const em = Math.round(value) / 1000;
    return em ? `${em}em` : em;
  };

  const round = (x: number, to: number = UNIT_SPACE) => {
    return Math.ceil(x / to) * to;
  };

  const font = {
    fontFamily: `'${fontFamily}', '${customFontFallback[fontFamily]}'`,
    fontWeight,
  };

  function calcLetterSpacing(fontSize: number) {
    const trackingTable = [
      { minFontSize: 6, maxFontSize: 12, minTracking: 41, maxTracking: 0 },
      { minFontSize: 13, maxFontSize: 17, minTracking: -6, maxTracking: -26 },
      { minFontSize: 18, maxFontSize: 29, minTracking: -25, maxTracking: 14 },
      { minFontSize: 30, maxFontSize: 76, minTracking: 14, maxTracking: 1 },
    ] as const;

    const { minFontSize, maxFontSize, minTracking, maxTracking } = (trackingTable.find(track => {
      return fontSize >= track.minFontSize && fontSize <= track.maxFontSize;
    }) as unknown) as {
      minFontSize: number;
      maxFontSize: number;
      minTracking: number;
      maxTracking: number;
    };

    return convertToEm(
      distribute({
        value: fontSize,
        rangeA: [minFontSize, maxFontSize],
        rangeB: [minTracking, maxTracking],
      })
    );
  }

  const lowercase = {
    fontSize: `${rawFontSize}px`,
    lineHeight: `${round(rawFontSize + leading, UNIT_SPACE)}px`,
    letterSpacing: calcLetterSpacing(rawFontSize),
    ...font,
  };
  const allCaps = {
    fontSize: `${rawFontSize}px`,
    lineHeight: `${round(rawFontSize + leading, UNIT_SPACE)}px`,
    textTransform: 'uppercase',
    letterSpacing: calcLetterSpacing(rawFontSize),
    ...font,
  };

  const adjustedLowercase = {
    fontSize: `${minLowerCaseFontSize}px`,
    lineHeight: `${round(minLowerCaseFontSize + leading, UNIT_SPACE)}px`,
    letterSpacing: calcLetterSpacing(minLowerCaseFontSize),
    ...font,
  };

  const adjustedUppercase = {
    fontSize: `${minUpperCaseFontSize}px`,
    lineHeight: `${round(minUpperCaseFontSize + leading, UNIT_SPACE)}px`,
    textTransform: 'uppercase',
    letterSpacing: calcLetterSpacing(minUpperCaseFontSize),
    ...font,
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

export function calculateMinFontSize(
  xHeight: number,
  options = {
    degree: 0.2,
    distanceInInches: 12,
  }
) {
  // degree in visual arch. (.2 is the minimum)
  // 12 inches is about normal for users
  const ppi = 96 / 458;
  const height = 72 * options.distanceInInches * Math.tan((options.degree * Math.PI) / 180);

  return Math.round((height / (xHeight * 2 * ppi)) * 10) / 10;
}
