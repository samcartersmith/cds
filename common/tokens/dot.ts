import { borderWidth, borderRadius } from './border';

export const dotOuterContainerStyles = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: borderWidth.button,
  borderColor: 'white',
} as const;

export const dotCountContent = {
  minWidth: borderRadius.tooltip * 2,
  height: borderRadius.tooltip * 2,
  borderRadius: borderRadius.pill,
} as const;

export const dotCountPadding = {
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 6,
  paddingRight: 6,
} as const;
