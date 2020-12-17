import type { ColorOptions, ColorProps, Color } from '@k-vyn/coloralgorithm/src/types';

export type ModeConfig = { properties: ColorProps; options: ColorOptions }[];
export type HueName =
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'red';
export type HueStep = 0 | 5 | 10 | 15 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export type HueStepName = `${HueName}${HueStep}`;
export type HueColor = Omit<Color, 'step'> & { step: HueStep };
export type HueSet = { colors: HueColor[]; name: HueName }[][];
export type ColorOutput = 'rgbString' | 'rgbArray';
export type SpectrumObject<T extends ColorOutput> = Record<
  HueStepName,
  T extends 'rgbString' ? string : [number, number, number]
>;
