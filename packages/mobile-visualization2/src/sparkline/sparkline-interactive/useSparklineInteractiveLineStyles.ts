import { useMemo } from 'react';
import { borderWidth } from '@cbhq/cds-common2/tokens/sparkline';
import { lineDashArray, lineOpacity } from '@cbhq/cds-common2/tokens/sparkline';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';

const staticLineProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  strokeDasharray: lineDashArray,
};

export function useSparklineInteractiveLineStyles() {
  const theme = useTheme();

  return useMemo(() => {
    const chartLineSize = theme.space[0.5];

    return {
      dotStyle: [
        {
          backgroundColor: theme.color.fgMuted,
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
        strokeWidth: borderWidth,
        stroke: theme.color.fgMuted,
      },
    };
  }, [theme.color.fgMuted, theme.space]);
}
