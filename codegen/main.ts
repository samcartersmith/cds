import { scaleConfig } from '@cb/design-system/codegen/configs/scaleConfig';
import { mapValues } from '@cb/design-system/utils';

import { Palette } from './Palette';
import { Spectrum } from './Spectrum/Spectrum';
import { updateTextStory } from './story/updateTextStory';
import { Type } from './Type/Type';
import { TypeScript } from './Typescript';
import { generateFromTemplate } from './utils/generateFromTemplate';
import { logError } from './utils/logError';

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
    {
      dest: 'theme/styles/foregroundColor.ts',
      data: Palette.cssColor,
    },
    {
      dest: 'theme/styles/backgroundColor.ts',
      data: Palette.cssBackgroundColor,
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
    {
      dest: 'theme/palette/defaultPalette.ts',
      data: { defaultPalette: Palette.defaultPalette },
    },
  ],
  'typescript.ejs': TypeScript,
  'components/Text.ejs': [
    {
      dest: 'web/src/components/Text/Text.tsx',
      data: Type.pascalCaseConfig,
    },
  ],
};

(async function () {
  const templateInputs: { template: string; dest: string; data: Record<string, unknown> }[] = [];
  try {
    Palette.validate();
    await updateTextStory();
    Object.entries(templates).forEach(([template, configs]) => {
      configs.map(({ dest, data }) => {
        templateInputs.push({
          template,
          dest,
          data,
        });
      });
    });
    await Promise.all(templateInputs.map(generateFromTemplate));
  } catch (err) {
    logError(err);
  }
})();
