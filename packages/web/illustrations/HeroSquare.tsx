import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { createIllustration } from './createIllustration';

export type { HeroSquareProps } from '@cbhq/cds-common/types';
export type { HeroSquareName } from '@cbhq/cds-illustrations';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const HeroSquare = createIllustration('heroSquare', heroSquareVersionMap);
