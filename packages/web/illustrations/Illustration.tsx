import React, { memo, useMemo } from 'react';
import type { IllustrationBaseProps, IllustrationVariant } from '@cbhq/cds-common';

import { createIllustration } from './createIllustration';

export type { IllustrationBaseProps } from '@cbhq/cds-common/types/IllustrationProps';

/**
 * @deprecated Do not use this component directly as this is not optimized for tree-shaking and will cause all
 * illustration assets to be included in your app. This component is used within CDS for visreg.
 *
 */
export const Illustration = memo(function Illustration<Type extends IllustrationVariant>({
  type,
  ...props
}: { type: Type } & IllustrationBaseProps<Type>) {
  const Component = useMemo(() => createIllustration(type), [type]);

  return <Component {...props} />;
});
