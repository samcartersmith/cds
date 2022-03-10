import { Scale } from '@cbhq/cds-common';

const dense = {
  checkboxSize: 16,
  radioSize: 16,
  switchWidth: 42,
  switchHeight: 24,
  switchThumbSize: 22,
};

const normal = {
  checkboxSize: 20,
  radioSize: 20,
  switchWidth: 52,
  switchHeight: 32,
  switchThumbSize: 30,
};

export const controlsConfig: Record<Scale, typeof dense | typeof normal> = {
  xSmall: dense,
  small: dense,
  medium: dense,
  large: normal,
  xLarge: normal,
  xxLarge: normal,
  xxxLarge: normal,
};
