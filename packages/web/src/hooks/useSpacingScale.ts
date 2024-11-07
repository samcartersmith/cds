import { SpacingScale } from '@cbhq/cds-common';

import { spacing } from '../tokens';

export const useSpacingScale = (val: SpacingScale) => spacing[val];
