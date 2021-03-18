import { memo, useMemo, lazy, Suspense } from 'react';

import { pascalCase } from '@cbhq/cds-utils';

import type { IconProps } from './props';
import { useIconPixelSize } from './useIconPixelSize';

export const IconHeavy: React.FC<IconProps> = memo(function IconHeavy({
  size,
  kind,
  fill,
  ...props
}) {
  const px = useIconPixelSize(size);
  const iconName = `Icon${pascalCase(kind)}${px}Heavy`;

  const LazyIcon = useMemo(() => {
    return lazy(() => import(`./components/${iconName}`));
  }, [iconName]);

  return (
    <Suspense fallback={<div style={{ width: px, height: px }} />}>
      <LazyIcon fill={fill} {...props} />
    </Suspense>
  );
});
