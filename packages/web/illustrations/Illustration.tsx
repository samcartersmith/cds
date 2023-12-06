import React, { memo, useMemo } from 'react';
import { IllustrationVariant } from '@cbhq/cds-common/types';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotIconVersionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { createIllustration, IllustrationBasePropsWithA11y } from './createIllustration';

/**
 * @deprecated This token will be deleted in v6.0.0. Please use versionMaps from @cbhq/cds-illustrations/__generated__/ instead.
 */
export const versionMaps: Record<IllustrationVariant, Record<string, number>> = {
  heroSquare: heroSquareVersionMap,
  spotSquare: spotSquareVersionMap,
  spotRectangle: spotRectangleVersionMap,
  pictogram: pictogramVersionMap,
  spotIcon: spotIconVersionMap,
};

type IllustrationProps<Type extends IllustrationVariant> = IllustrationBasePropsWithA11y<Type> & {
  type: Type;
};

/**
 * @deprecated This component will be deleted in v6.0.0. Please use HeroSquare, SpotSquare, SpotRectangle, or Pictogram components instead.
 */
export const Illustration = memo(function Illustration<Type extends IllustrationVariant>({
  type,
  ...props
}: { type: Type } & IllustrationProps<Type>) {
  const Component = useMemo(() => createIllustration<Type>(type, versionMaps[type]), [type]);

  return <Component {...props} />;
});
