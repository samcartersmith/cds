import type { SpotSquareProps as SpotSquareCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export const SpotSquare = createIllustration('spotSquare', spotSquareVersionMap);

export type SpotSquareProps = SpotSquareCommonProps & IllustrationA11yProps;
export type { SpotSquareName } from '@cbhq/cds-illustrations';
