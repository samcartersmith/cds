import type { SpotIconProps as SpotIconCommonProps } from '@cbhq/cds-common/types/IllustrationProps';
import spotIconVersionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/versionMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export const SpotIcon = createIllustration('spotIcon', spotIconVersionMap);

export type SpotIconProps = SpotIconCommonProps & IllustrationA11yProps;
export type { SpotIconName } from '@cbhq/cds-illustrations';
