import pictogramIllustrations from '@cbhq/cds-illustrations/__generated__/pictogram/data/svgJsMap';

import { createIllustration } from './createIllustration';

export type { PictogramProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { PictogramName } from '@cbhq/cds-illustrations/__generated__/pictogram/types/PictogramName';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const Pictogram = createIllustration('pictogram', pictogramIllustrations);
