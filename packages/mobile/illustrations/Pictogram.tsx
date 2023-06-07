import { PictogramProps as PictogramCommonProps } from '@cbhq/cds-common';
import pictogramIllustrations from '@cbhq/cds-illustrations/__generated__/pictogram/data/svgJsMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export type PictogramProps = PictogramCommonProps & IllustrationA11yProps;

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const Pictogram = createIllustration('pictogram', pictogramIllustrations);

export type { PictogramName } from '@cbhq/cds-illustrations';
