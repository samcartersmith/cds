import type { SpotSquareProps as SpotSquareCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import spotSquareIllustrations from '@cbhq/cds-illustrations/__generated__/spotSquare/data/svgJsMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const SpotSquare = createIllustration('spotSquare', spotSquareIllustrations);

export type SpotSquareProps = SpotSquareCommonProps & IllustrationA11yProps;

export type { SpotSquareName } from '@cbhq/cds-illustrations';
