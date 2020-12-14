import { scales, Scale } from '@cb/design-system-web/primitives/scale/scale';
import { UNIT_SPACE } from '@cb/design-system-web/primitives/spacing';
import {
  xHeight,
  TypeVariant,
  typography,
  Typography,
} from 'eng/shared/design-system/codegen/Type/config';
import { decamelizeKeys } from 'humps';

type GeneratedTypeStyles = {
  [key in Scale]: {
    [key in Typography]: {
      'font-family': string;
      'font-size': string;
      'line-height': string;
      'letter-spacing': string;
      'font-weight': string;
    };
  };
};

export const generateTypeStyles = (
  supportedScales: typeof scales,
  typesConfig: typeof typography
): GeneratedTypeStyles => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const styles: { [key: string]: { [key: string]: object } } = {};
  for (const [scaleName, scale] of Object.entries(supportedScales)) {
    for (const [type, styleConfig] of Object.entries(typesConfig)) {
      if (!styles[scaleName as Scale]) {
        styles[scaleName as Scale] = {};
      }
      styles[scaleName as Scale][type as Typography] = decamelizeKeys(
        calculateVariantStyle(styleConfig, scale),
        {
          separator: '-',
        }
      );
    }
  }

  return styles as GeneratedTypeStyles;
};

type DistributeProps = {
  value: number;
  rangeA: number[];
  rangeB: number[];
  limit?: boolean;
};

/**
 * Project value from rangeA to rangeB linearly.
 */
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
