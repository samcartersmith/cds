// @ts-expect-error Not typed
import { generate } from '@k-vyn/coloralgorithm';
import { emptyObject } from '@cbhq/cds-utils/object';

import * as modes from '../configs/spectrum';

import {
  ColorOutput,
  HueColor,
  HueName,
  HueSet,
  HueStepName,
  ModeConfig,
  SpectrumObject,
} from './types';

export const createSpectrum = <T extends ColorOutput>(mode: keyof typeof modes, output: T) => {
  const typedMode = modes[mode] as ModeConfig;
  const createStepsForHue = (hueName: HueName, colors: HueColor[]) => {
    return colors.reduce((prevStep, { step, rgbString, rgbArray }) => {
      const colorName = `${hueName}${step * 10}` as HueStepName;
      return {
        ...prevStep,
        [colorName]: output === 'rgbString' ? rgbString : rgbArray,
      };
    }, emptyObject as Record<HueStepName, string>);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  const hueSetForMode = typedMode.map((item) => generate(item.properties, item.options)) as HueSet;

  /*
    [ { inverted: false, colors: Color[], name: 'Blue' } ],
    [ { inverted: false, colors: Color[], name: 'Green' } ]

    Loop over each hue for given mode and its steps and return flat object
  */

  return hueSetForMode.reduce((prev, next) => {
    return {
      ...prev,
      ...next.reduce((prevInner, { name, colors }) => {
        return {
          ...prevInner,
          ...createStepsForHue(name, colors),
        };
      }, emptyObject),
    };
  }, emptyObject as SpectrumObject<T>);
};
