import { AnyObject } from '@cbhq/cds-utils';

import { writeFile, TemplateMap } from './writeFile';
import { logError } from './logError';

export const buildTemplates = async (templates: TemplateMap) => {
  const templateInputs: {
    template: string;
    dest: string;
    data: unknown;
    config?: AnyObject;
  }[] = [];

  try {
    Object.entries(templates).forEach(([template, items]) => {
      items.forEach(({ dest, data, config = {} }) => {
        templateInputs.push({
          template,
          dest,
          data,
          config,
        });
      });
    });

    await Promise.all(templateInputs.map(writeFile));
  } catch (err) {
    logError((err as Error).message);
  }
};
