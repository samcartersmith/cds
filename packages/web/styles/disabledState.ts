import { css } from 'linaria';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { interactableDisabledBackground } from '../system/interactableCSSProperties';

export const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
  background-color: var(${interactableDisabledBackground});
`;
