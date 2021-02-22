import { AnyObject } from '@cbhq/cds-utils';

import { generateFromTemplate } from './generateFromTemplate';
import { logError } from './logError';

export type TemplateMap = Record<string, { dest: string; data: unknown; config?: AnyObject }[]>;

export const buildTemplates = async (templates: TemplateMap) => {
  const templateInputs: {
    template: string;
    dest: string;
    data: unknown;
    config?: AnyObject;
  }[] = [];

  try {
    Object.entries(templates).forEach(([template, items]) => {
      items.map(({ dest, data, config = {} }) => {
        templateInputs.push({
          template,
          dest,
          data,
          config,
        });
      });
    });

    await Promise.all(templateInputs.map(generateFromTemplate));
  } catch (err) {
    logError(err);
  }
};
