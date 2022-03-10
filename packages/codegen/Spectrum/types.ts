import type { ColorOptions, ColorProps, Color } from '@k-vyn/coloralgorithm/src/types';

import type { hueNames, hueSteps } from './Spectrum';

export type ModeConfig = { properties: ColorProps; options: ColorOptions }[];
export type HueName = typeof hueNames[number];
export type HueStep = typeof hueSteps[number];
export type HueStepName = `${HueName}${HueStep}`;
export type HueColor = Omit<Color, 'step'> & { step: HueStep };
export type HueSet = { colors: HueColor[]; name: HueName }[][];
export type ColorOutput = 'rgbString' | 'rgbArray';
export type SpectrumObject<T extends ColorOutput> = Record<
  HueStepName,
  T extends 'rgbString' ? string : [number, number, number]
>;
