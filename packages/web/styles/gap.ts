import { css } from 'linaria';
import type { SpacingScale } from '@cbhq/cds-common/types';

import { spacing } from '../tokens';

export const gap: Record<SpacingScale, string> = {
  '0': css`
    gap: ${spacing['0']};
  `,
  '0.5': css`
    gap: ${spacing['0.5']};
  `,
  '1': css`
    gap: ${spacing['1']};
  `,
  '2': css`
    gap: ${spacing['2']};
  `,
  '3': css`
    gap: ${spacing['3']};
  `,
  '4': css`
    gap: ${spacing['4']};
  `,
  '5': css`
    gap: ${spacing['5']};
  `,
  '6': css`
    gap: ${spacing['6']};
  `,
  '7': css`
    gap: ${spacing['7']};
  `,
  '8': css`
    gap: ${spacing['8']};
  `,
  '9': css`
    gap: ${spacing['9']};
  `,
  '10': css`
    gap: ${spacing['10']};
  `,
};
