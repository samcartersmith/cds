import { dark, frontierDark, frontierLight, light } from './spectrumRgbArray';

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
