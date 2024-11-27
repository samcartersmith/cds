import { css } from '@linaria/core';
import { horizontalSpacing } from '@cbhq/cds-common/tokens/tags';

import { spacing } from '../tokens';

export const tagSpacingStyles = {
  informational: css`
    padding: 2px ${spacing[horizontalSpacing.informational]};
  `,
  promotional: css`
    padding: 2px ${spacing[horizontalSpacing.promotional]};
  `,
} as const;
