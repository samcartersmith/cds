import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { createIllustration } from './createIllustration';

export type { SpotSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { SpotSquareName } from '@cbhq/cds-illustrations';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const SpotSquare = createIllustration('spotSquare', spotSquareVersionMap);
