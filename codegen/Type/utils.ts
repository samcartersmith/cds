type DistributeProps = {
  value: number;
  rangeA: number[];
  rangeB: number[];
  limit?: boolean;
};

const UNIT_SPACE = 4;

const convertToEm = (value: number) => {
  const em = Math.round(value) / 1000;
  return em ? `${em}em` : em;
};

export const round = (x: number, to: number = UNIT_SPACE) => {
  return Math.ceil(x / to) * to;
};

const distribute = ({ value, rangeA, rangeB, limit = false }: DistributeProps) => {
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

export function calculateLetterSpacing(fontSize: number, unitless: boolean) {
  const trackingTable = [
    { minFontSize: 6, maxFontSize: 12, minTracking: 41, maxTracking: 0 },
    { minFontSize: 13, maxFontSize: 17, minTracking: -6, maxTracking: -26 },
    { minFontSize: 18, maxFontSize: 29, minTracking: -25, maxTracking: 14 },
    { minFontSize: 30, maxFontSize: 76, minTracking: 14, maxTracking: 1 },
  ] as const;

  const { minFontSize, maxFontSize, minTracking, maxTracking } = trackingTable.find(track => {
    return fontSize >= track.minFontSize && fontSize <= track.maxFontSize;
  }) as unknown as {
    minFontSize: number;
    maxFontSize: number;
    minTracking: number;
    maxTracking: number;
  };

  const rawValue = distribute({
    value: fontSize,
    rangeA: [minFontSize, maxFontSize],
    rangeB: [minTracking, maxTracking],
  });
  return unitless ? rawValue : convertToEm(rawValue);
}

export const calculateMinFontSize = (
  xHeight: number,
  options = {
    degree: 0.2,
    distanceInInches: 12,
  }
) => {
  // degree in visual arch. (.2 is the minimum)
  // 12 inches is about normal for users
  const ppi = 96 / 458;
  const height = 72 * options.distanceInInches * Math.tan((options.degree * Math.PI) / 180);

  return Math.round((height / (xHeight * 2 * ppi)) * 10) / 10;
};
