import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { createIllustration } from './createIllustration';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const HeroSquare = createIllustration('heroSquare', heroSquareVersionMap);

export type { HeroSquareProps } from '@cbhq/cds-common/types';
export type { HeroSquareName } from '@cbhq/cds-illustrations';
