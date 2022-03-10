import { mapKeys, mapValues, toCssVar, toCssVarFn } from '@cbhq/cds-utils/index';

import { controlsConfig } from './configs/controlsConfig';
import { DEFAULT_SCALE } from './configs/scaleConfig';

export const Control = {
  scaleCss: mapValues(controlsConfig, (styles) =>
    mapValues(
      mapKeys(styles, (_, key) => toCssVar(key)),
      (value) => `${value}px`,
    ),
  ),
  mobile: controlsConfig,
  cssVariables: mapValues(controlsConfig[DEFAULT_SCALE], (_, key) => toCssVarFn(key)),
};
