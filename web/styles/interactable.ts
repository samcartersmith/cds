import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { css } from 'linaria';

export const interactable = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  margin: 0;

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover,
  label:hover & {
    --interactable-opacity: var(--interactable-opacity-hovered);
  }

  &:active,
  label:active & {
    --interactable-opacity: var(--interactable-opacity-pressed);
  }
`;

// Background used on solid elements, like buttons.
export const interactableBackground = css`
  background-image: linear-gradient(
    to right,
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1)),
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1))
  );
  background-color: var(--interactable-underlay);
`;

export const interactableControls = css`
  height: fit-content;
  width: fit-content;
`;

// Hide background on non-solid elements, like controls.
// Also used as an initial state for link buttons.
export const interactableTransparent = css`
  background-image: none;
  background-color: transparent;
  border-color: transparent;
`;

// For link buttons, we need to go from a transparent
// background to a solid when interacted with.
export const interactableTransparentActive = css`
  &:active,
  &:hover {
    background-image: linear-gradient(
      to right,
      rgba(var(--interactable-overlay), var(--interactable-opacity, 1)),
      rgba(var(--interactable-overlay), var(--interactable-opacity, 1))
    );
    background-color: var(--interactable-underlay);
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

export const overlay = css`
  position: relative;
  z-index: 1;
  transition: opacity 150ms ease-out;
  opacity: var(--interactable-opacity, 1);
  display: block;
`;

export const underlay = css`
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  z-index: 0;
  overflow: hidden;
  background-color: var(--interactable-underlay);
  display: block;
`;

export const transparentChildren = css`
  /* Apply opacity to children as well */
  & > * {
    opacity: var(--interactable-opacity, 1);
  }
`;
