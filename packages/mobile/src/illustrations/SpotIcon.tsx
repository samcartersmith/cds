import type { SpotIconProps as SpotIconCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import svgJsMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/svgJsMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export const SpotIcon = createIllustration('spotIcon', svgJsMap);

export type SpotIconProps = SpotIconCommonProps & IllustrationA11yProps;
export type { SpotIconName } from '@cbhq/cds-illustrations';
