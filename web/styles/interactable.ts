import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { css } from 'linaria';

export const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;
