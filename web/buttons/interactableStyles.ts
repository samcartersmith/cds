import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { css } from 'linaria';

export const interactable = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  margin: 0;

  background-image: linear-gradient(
    to right,
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1)),
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1))
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

  /* Apply opacity to children as well */
  & > * {
    opacity: var(--interactable-opacity, 1);
  }

  &:hover {
    --interactable-opacity: var(--interactable-opacity-hovered);
  }

  &:active {
    --interactable-opacity: var(--interactable-opacity-pressed);
  }
`;

export const scaledDownState = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active {
    transform: scale(0.98);
  }
`;

export const disabledState = css`
  opacity: ${opacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;
