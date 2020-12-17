import * as modes from '@cb/design-system/codegen/configs/spectrum';
import { emptyObject } from '@cb/design-system/utils';
import { generate } from '@k-vyn/coloralgorithm';

import {
  ColorOutput,
  ModeConfig,
  HueName,
  HueColor,
  HueSet,
  HueStepName,
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

  const hueSetForMode: HueSet = typedMode.map(item => {
    return generate(item.properties, item.options);
  });

  /* 
    [ { inverted: false, colors: Color[], name: 'Blue' } ],
    [ { inverted: false, colors: Color[], name: 'Green' } ]

    Loop over each hue for given mode and its steps and return flat object
  */

  return hueSetForMode.reduce((prev, next) => {
    return {
      ...prev,
      ...next.reduce((prev, { name, colors }) => {
        return {
          ...prev,
          ...createStepsForHue(name, colors),
        };
      }, emptyObject),
    };
  }, emptyObject as SpectrumObject<T>);
};
