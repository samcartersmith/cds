// import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { css } from 'linaria';

// TODO: Fix when we can do deep imports in common
const opacityDisabled = 0.38;

export const interactable = css`
  position: relative;
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  margin: 0;
  transition: transform 100ms;
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);
  opacity: var(--interactable-opacity);
  background-image: linear-gradient(
    to right,
    var(--interactable-background),
    var(--interactable-background)
  );
  background-color: var(--interactable-underlay);
  /* stylelint-disable plugin/no-low-performance-animation-properties */
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
    background-image 150ms ease-in-out, transform 100ms;
  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
`;

export const scaledDownState = css`
  transform: scale(0.98);
`;

export const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;
