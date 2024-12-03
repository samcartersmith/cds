import type { DensityTheme } from '../../../core/theme';
import * as vars from '../../../styles/vars';

// TO DO: update the space token once the design tokens are updated
export const denseDensityTheme = {
  space: {
    '0': '0px',
    '0.25': '1px',
    '0.5': '3px',
    '0.75': '5px',
    '1': '6px',
    '1.5': '9px',
    '2': '12px',
    '3': '18px',
    '4': '24px',
    '5': '30px',
    '6': '36px',
    '7': '42px',
    '8': '48px',
    '9': '54px',
    '10': '60px',
  },
  iconSize: {
    xs: '8px',
    s: '12px',
    m: '16px',
    l: '24px',
  },
  avatarSize: {
    s: '16px',
    m: '20px',
    l: '24px',
    xl: '36px',
    xxl: '44px',
    xxxl: '48px',
  },
  control: {
    checkboxSize: '16px',
    radioSize: '16px',
    switchWidth: '42px',
    switchHeight: '24px',
    switchThumbSize: '22px',
  },
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  fontWeight: vars.fontWeight,
  lineHeight: vars.lineHeight,
} as const satisfies DensityTheme;
