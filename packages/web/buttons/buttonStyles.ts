import { css } from 'linaria';

import { spacing } from '../tokens';

/**
 * @deprecated Use spinnerHeight instead when using Spinner component
 */
export const LOADERSIZE = 24;

export const spinnerHeight = 2.5;

export const spinnerLoader = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${spinnerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const button = css`
  text-decoration: none;
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
  && {
    min-width: auto;
  }
`;

export const buttonBlock = css`
  && {
    display: flex;
    width: 100%;
    max-width: 100%;
    white-space: normal;
  }
`;

export const iconButton = css`
  width: var(--interactable-height);
  height: var(--interactable-height);
  min-width: unset;
`;

export const avatarButton = iconButton;

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

export const unsetNoWrap = css`
  white-space: unset;
`;

export const buttonWithIcon = css`
  && {
    justify-content: space-between;
  }
`;

export const icon = `
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
`;

export const startIcon = css`
  ${icon};
  justify-content: flex-start;
  margin-right: ${spacing[1]};
`;
export const endIcon = css`
  ${icon};
  justify-content: flex-end;
  margin-left: ${spacing[1]};
`;
