import spotRectangleIllustrations from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/svgJsMap';

import { createIllustration } from './createIllustration';

export type { SpotRectangleProps } from '@cbhq/cds-common/types/IllustrationProps';
export type { SpotRectangleName } from '@cbhq/cds-illustrations';

/**
 * @changelog ./createIllustration.tsx, ./Illustration.tsx
 */
export const SpotRectangle = createIllustration('spotRectangle', spotRectangleIllustrations);
