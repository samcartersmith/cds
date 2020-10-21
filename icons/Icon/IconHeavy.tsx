import * as React from 'react';

import { pascalize } from 'humps';

import { useIconPixelSize, placeholderStyles } from './constants';
import type { IconProps } from './IconProps';

export const IconHeavy: React.FC<IconProps> = React.memo(function IconHeavy({ size, kind, fill }) {
  const px = useIconPixelSize(size);
  const iconName = `Icon${pascalize(kind)}${px}Heavy`;

  const LazyIcon = React.lazy(() => import(`../react/${iconName}`));

  return (
    <React.Suspense fallback={<div className={placeholderStyles[px]} />}>
      <LazyIcon fill={fill} />
    </React.Suspense>
  );
});
