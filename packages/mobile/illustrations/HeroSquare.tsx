import heroSquareIllustrations from '@cbhq/cds-illustrations/__generated__/heroSquare/data/svgJsMap';

import { createIllustration } from './createIllustration';

export type { HeroSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { HeroSquareName } from '@cbhq/cds-illustrations/__generated__/heroSquare/types/HeroSquareName';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const HeroSquare = createIllustration('heroSquare', heroSquareIllustrations);
