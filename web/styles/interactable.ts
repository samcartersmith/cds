import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { css } from 'linaria';

export const interactable = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  margin: 0;

  /* stylelint-disable plugin/no-low-performance-animation-properties */
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
    background-image 150ms ease-in-out, transform 100ms;

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:active,
  label:active & {
    --interactable-opacity: var(--interactable-opacity-pressed);
  }

  &:hover,
  label:hover & {
    --interactable-opacity: var(--interactable-opacity-hovered);
  }
`;

export const interactableBackground = css`
  background-image: linear-gradient(
    to right,
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1)),
    rgba(var(--interactable-overlay), var(--interactable-opacity, 1))
  );
  background-color: var(--interactable-underlay);

  /* Apply opacity to children as well */
  & > * {
    opacity: var(--interactable-opacity, 1);
  }
`;

export const interactableTransparent = css`
  background-image: none;
  background-color: transparent;
  border-color: transparent;
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
  width: 100%;
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
