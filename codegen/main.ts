import { scaleConfig } from '@cb/design-system/codegen/configs/scaleConfig';
import { Spectrum } from '@cb/design-system/codegen/Spectrum/Spectrum';
import { mapValues } from '@cb/design-system/utils';

import { updateTextStory } from './story/updateTextStory';
import { Type } from './Type/Type';
import { generateFromTemplate } from './utils/generateFromTemplate';

const templates: Record<string, { dest: string; data: Record<string, unknown> }[]> = {
  'css.ejs': [
    {
      dest: 'web/src/components/Text/textStyles.ts',
      data: Type.css,
    },
    {
      dest: 'theme/styles/scale.ts',
      data: Type.scaleCss,
    },
    {
      dest: 'theme/styles/spectrum.ts',
      data: Spectrum.css,
    },
  ],
  'objectMap.ejs': [
    {
      dest: 'theme/styles/scale.native.ts',
      data: mapValues(scaleConfig, (_, scale) => {
        return {
          typography: Type.native[scale],
        };
      }),
    },
    {
      dest: 'theme/styles/spectrum.native.ts',
      data: Spectrum.native,
    },
  ],
};

(function () {
  const templateInputs: { template: string; dest: string; data: Record<string, unknown> }[] = [];
  Object.entries(templates).forEach(([template, configs]) => {
    configs.map(({ dest, data }) => {
      templateInputs.push({
        template,
        dest,
        data,
      });
    });
  });
  [
    ...templateInputs,
    {
      template: 'components/Text.ejs',
      dest: 'web/src/components/Text/Text.tsx',
      data: Type.pascalCaseConfig,
    },
  ].forEach(config => {
    generateFromTemplate(config);
  });

  updateTextStory();
})();
