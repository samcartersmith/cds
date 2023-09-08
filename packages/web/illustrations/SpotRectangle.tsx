import type { SpotRectangleProps as SpotRectangleCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export type SpotRectangleProps = SpotRectangleCommonProps & IllustrationA11yProps;

export const SpotRectangle = createIllustration('spotRectangle', spotRectangleVersionMap);

export type { SpotRectangleName } from '@cbhq/cds-illustrations';
