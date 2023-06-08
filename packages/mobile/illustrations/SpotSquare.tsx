import spotSquareIllustrations from '@cbhq/cds-illustrations/__generated__/spotSquare/data/svgJsMap';

import { createIllustration } from './createIllustration';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const SpotSquare = createIllustration('spotSquare', spotSquareIllustrations);

export type { SpotSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { SpotSquareName } from '@cbhq/cds-illustrations';
