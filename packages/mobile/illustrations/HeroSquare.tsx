import type { HeroSquareProps as HeroSquareCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import heroSquareIllustrations from '@cbhq/cds-illustrations/__generated__/heroSquare/data/svgJsMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export type HeroSquareProps = HeroSquareCommonProps & IllustrationA11yProps;

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const HeroSquare = createIllustration('heroSquare', heroSquareIllustrations);

export type { HeroSquareName } from '@cbhq/cds-illustrations';
