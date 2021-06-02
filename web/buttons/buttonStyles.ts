import { css } from 'linaria';

import { spacing } from '../tokens';

export const LOADERSIZE = 24;

export const button = css`
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0;
  position: relative;
  min-width: 100px;
  white-space: nowrap;
  appearance: none;
  outline: 0;
  overflow: visible;
  text-transform: none;
  height: var(--interactable-height);
`;

export const buttonCompact = css`
  min-width: auto;
`;

export const buttonBlock = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

export const iconButton = css`
  width: var(--interactable-height);
  height: var(--interactable-height);
  min-width: unset;
`;

export const startIcon = css`
  display: inline-block;
  margin-right: ${spacing[1]};
`;

export const endIcon = css`
  display: inline-block;
  margin-left: ${spacing[1]};
`;

// Need to add height here to contain the icon size or
// it will render 30px height making it look off center
export const centerLoader = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${LOADERSIZE}px;
`;

export const visibilityHidden = css`
  visibility: hidden;
`;

export const positionRelative = css`
  position: relative;
`;
