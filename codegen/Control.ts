import { mapKeys, mapValues, toCssVar, toCssVarFn } from '@cbhq/cds-utils';
import { DEFAULT_SCALE } from 'eng/shared/design-system/codegen/configs/scaleConfig';

import { controlsConfig } from './configs/controlsConfig';

export const Control = {
  scaleCss: mapValues(controlsConfig, styles =>
    mapValues(
      mapKeys(styles, (_, key) => toCssVar(key)),
      value => `${value}px`,
    ),
  ),
  mobile: controlsConfig,
  cssVariables: mapValues(controlsConfig[DEFAULT_SCALE], (_, key) => toCssVarFn(key)),
};
