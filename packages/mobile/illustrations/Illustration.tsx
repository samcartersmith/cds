import React, { memo, useMemo } from 'react';
import { IllustrationVariant } from '@cbhq/cds-common/types';
import heroSquares from '@cbhq/cds-illustrations/__generated__/heroSquare/data/svgJsMap';
import pictograms from '@cbhq/cds-illustrations/__generated__/pictogram/data/svgJsMap';
import spotRectangles from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/svgJsMap';
import spotSquares from '@cbhq/cds-illustrations/__generated__/spotSquare/data/svgJsMap';

import { createIllustration, IllustrationBasePropsWithA11y } from './createIllustration';

const illustrations = {
  heroSquare: heroSquares,
  spotSquare: spotSquares,
  spotRectangle: spotRectangles,
  pictogram: pictograms,
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
}: IllustrationProps<Type>) {
  const Component = useMemo(() => createIllustration(type, illustrations[type]), [type]);

  return <Component {...props} />;
});
