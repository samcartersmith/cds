import { useMemo } from 'react';
import { useScaleConditional } from '../scale/useScaleConditional';

import type { IconSize, IconPixelSize } from '../types';

type IconScaleMap = Record<IconSize, IconPixelSize>;

const denseScaleMap: IconScaleMap = { l: 24, m: 16, s: 12, xs: 8 };
const normalScaleMap: IconScaleMap = { l: 32, m: 24, s: 16, xs: 12 };

export const useIconSize = (size: IconSize, bordered?: boolean) => {
  const scaleMap = useScaleConditional({ dense: denseScaleMap, normal: normalScaleMap });
  const wrapperSize = scaleMap[size];
  const iconSize = useMemo(() => {
    if (bordered) {
      switch (size) {
        case 'l':
          return scaleMap.s;
        case 'm':
        default:
          return scaleMap.xs;
      }
    }
    return wrapperSize;
  }, [bordered, size, wrapperSize, scaleMap]);

  return useMemo(() => ({ wrapperSize, iconSize }), [iconSize, wrapperSize]);
};
