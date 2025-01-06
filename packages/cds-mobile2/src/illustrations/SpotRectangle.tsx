import type { SpotRectangleProps as SpotRectangleCommonProps } from '@cbhq/cds-common2/types/IllustrationProps';
import spotRectangleIllustrations from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/svgJsMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export type SpotRectangleProps = SpotRectangleCommonProps & IllustrationA11yProps;

export const SpotRectangle = createIllustration('spotRectangle', spotRectangleIllustrations);

export type { SpotRectangleName } from '@cbhq/cds-illustrations';
