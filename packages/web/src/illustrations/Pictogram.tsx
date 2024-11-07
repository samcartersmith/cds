import type { PictogramProps as CommonPictogramProps } from '@cbhq/cds-common/types/IllustrationProps';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';

import { createIllustration, IllustrationA11yProps } from './createIllustration';

export const Pictogram = createIllustration('pictogram', pictogramVersionMap);

export type PictogramProps = CommonPictogramProps & IllustrationA11yProps;
export type { PictogramName } from '@cbhq/cds-illustrations';
