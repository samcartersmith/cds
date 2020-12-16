import * as React from 'react';

import { pascalize } from 'humps';

import type { IconProps } from './props';
import { useIconPixelSize } from './useIconPixelSize';

export const IconLight: React.FC<IconProps> = React.memo(function IconLight({
  size,
  kind,
  fill,
  ...props
}) {
  const px = useIconPixelSize(size);
  const iconName = `Icon${pascalize(kind)}${px}Light`;

  const LazyIcon = React.lazy(() => import(`./components/${iconName}`));

  return (
    <React.Suspense fallback={<div style={{ width: px, height: px }} />}>
      <LazyIcon fill={fill} {...props} />
    </React.Suspense>
  );
});
