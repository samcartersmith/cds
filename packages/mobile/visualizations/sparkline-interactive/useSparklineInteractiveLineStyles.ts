import { useMemo } from 'react';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { lineDashArray, lineOpacity } from '@cbhq/cds-common/tokens/sparkline';

import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';

const staticLineProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  strokeDasharray: lineDashArray,
};

export function useSparklineInteractiveLineStyles() {
  const colors = usePalette();
  const spacing = useSpacingScale();

  return useMemo(() => {
    const chartLineSize = spacing[0.5];

    return {
      dotStyle: [
        {
          backgroundColor: colors.foregroundMuted,
        },
        {
          position: 'absolute',
          top: -chartLineSize / 2,
          left: -chartLineSize / 2,
          height: chartLineSize,
          width: chartLineSize,
          borderRadius: chartLineSize / 2,
          opacity: lineOpacity,
        },
      ],
      lineProps: {
        ...staticLineProps,
        strokeWidth: borderWidth.sparkline,
        stroke: colors.foregroundMuted,
      },
    };
  }, [colors, spacing]);
}
