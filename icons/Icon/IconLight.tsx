import * as React from 'react';

import { pascalize } from 'humps';

import { useIconPixelSize, placeholderStyles } from './constants';
import type { IconProps } from './IconProps';

export const IconLight: React.FC<IconProps> = React.memo(function IconLight({ size, kind }) {
  const px = useIconPixelSize(size);
  const iconName = `Icon${pascalize(kind)}${px}Light`;

  const LazyIcon = React.lazy(() => import(`../react/${iconName}`));

  return (
    <React.Suspense fallback={<div className={placeholderStyles[px]} />}>
      <LazyIcon />
    </React.Suspense>
  );
});
