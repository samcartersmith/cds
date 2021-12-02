import { borderWidth, borderRadius } from './border';

export const dotOuterContainerStyles = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: borderWidth.button,
  borderColor: 'white',
};

export const dotCountContent = {
  minWidth: borderRadius.tooltip * 2,
  height: borderRadius.tooltip * 2,
  padding: 3,
  borderRadius: borderRadius.pill,
};
