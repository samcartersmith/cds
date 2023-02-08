import spotSquareIllustrations from '@cbhq/cds-illustrations/__generated__/spotSquare/data/svgJsMap';

import { createIllustration } from './createIllustration';

export type { SpotSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { SpotSquareName } from '@cbhq/cds-illustrations';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const SpotSquare = createIllustration('spotSquare', spotSquareIllustrations);
