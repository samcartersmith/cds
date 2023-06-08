import React, { memo, useMemo } from 'react';
import { IllustrationVariant } from '@cbhq/cds-common/types';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { createIllustration, IllustrationBasePropsWithA11y } from './createIllustration';

export const versionMaps: Record<IllustrationVariant, Record<string, number>> = {
  heroSquare: heroSquareVersionMap,
  spotSquare: spotSquareVersionMap,
  spotRectangle: spotRectangleVersionMap,
  pictogram: pictogramVersionMap,
};

type IllustrationProps<Type extends IllustrationVariant> = IllustrationBasePropsWithA11y<Type> & {
  type: Type;
};

/**
 * @deprecated Do not use this component directly as this is not optimized for tree-shaking and will cause all
 * illustration assets to be included in your app. This component is used within CDS for visreg.
 *
 */
export const Illustration = memo(function Illustration<Type extends IllustrationVariant>({
  type,
  ...props
}: { type: Type } & IllustrationProps<Type>) {
  const Component = useMemo(() => createIllustration<Type>(type, versionMaps[type]), [type]);

  return <Component {...props} />;
});
