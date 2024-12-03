import type { DensityTheme } from '../../../core/theme';
import * as vars from '../../../styles/vars';

export const normalDensityTheme = {
  space: vars.space,
  iconSize: vars.iconSize,
  avatarSize: vars.avatarSize,
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  fontWeight: vars.fontWeight,
  lineHeight: vars.lineHeight,
  control: vars.control,
} as const satisfies DensityTheme;
