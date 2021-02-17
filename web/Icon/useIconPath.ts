import { useMemo } from 'react';

import type { IconName, IconPixelSize } from '@cds/common';

import * as paths from './paths';

type SvgData = {
  paths: string[];
  viewBox: string;
};

export const useIconPath = (size: IconPixelSize, name: IconName): SvgData => {
  return useMemo(() => paths[`size${size}` as const][name], [size, name]);
};
