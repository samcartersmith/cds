import { scaleConfig } from '@cb/design-system/codegen/configs/scaleConfig';
import { mapValues } from '@cb/design-system/utils';

import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { generateFromTemplate } from './utils/generateFromTemplate';

const web = {
  typography: Type.css,
  scale: Type.scaleCss,
  spectrum: Spectrum.css,
} as const;

const native = {
  scale: mapValues(scaleConfig, (_, scale) => {
    return {
      typography: Type.native[scale],
    };
  }),
  spectrum: Spectrum.native,
} as const;

(function () {
  [
    ...Object.entries(web).map(([name, data]) => ({
      template: 'css.ejs',
      dest: `theme/styles/${name}.ts`,
      data,
    })),
    ...Object.entries(native).map(([name, data]) => ({
      template: 'objectMap.ejs',
      dest: `theme/styles/${name}.native.ts`,
      data,
    })),
    {
      template: 'components/Text.ejs',
      dest: 'web/src/components/Text/Text.tsx',
      data: Type.pascalCaseConfig,
    },
  ].forEach(config => {
    generateFromTemplate(config);
  });

  Type.updateTextStory();
})();
