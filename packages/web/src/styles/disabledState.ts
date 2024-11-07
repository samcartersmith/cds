import { css } from 'linaria';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { interactableDisabledBackground } from '../system/interactableCSSProperties';

export const disabledState = css`
  opacity: ${accessibleOpacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
  background-color: var(${interactableDisabledBackground});
`;

export const disabledBorder = css`
  && {
    // safari specific fix to https://bugs.webkit.org/show_bug.cgi?id=238088
    border-color: rgba(0, 0, 0, 0.005);
  }
`;
