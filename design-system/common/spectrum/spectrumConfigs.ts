import { light, dark, frontierLight, frontierDark } from './spectrumRgbArray';

export const spectrumConfigs = {
  base: {
    light,
    dark,
  },
  frontier: {
    light: { ...light, ...frontierLight },
    dark: { ...dark, ...frontierDark },
  },
};
