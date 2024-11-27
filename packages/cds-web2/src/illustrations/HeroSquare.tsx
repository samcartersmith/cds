import type { HeroSquareProps as HeroSquareCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export type HeroSquareProps = HeroSquareCommonProps & IllustrationA11yProps;

export const HeroSquare = createIllustration('heroSquare', heroSquareVersionMap);

export type { HeroSquareName } from '@cbhq/cds-illustrations/__generated__/heroSquare/types/HeroSquareName';
