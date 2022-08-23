import { TOCItem } from '@docusaurus/types';
import slugify from '@cbhq/docusaurus-theme/src/utils/slugify';

import type { ComponentPageFields, ComponentPageProps } from './pages/ComponentPage';

export function populateGuidelinesToc(fields: ComponentPageFields) {
  const toc = ['Principles', 'Usage', 'Anatomy', 'Spacing', 'Sizing'];

  if (fields.behavior) {
    toc.push('Behavior');
  }
  if (fields.content) {
    toc.push('Content');
  }
  if (fields.motion) {
    toc.push('Motion');
  }

  return toc.map((item) => ({
    id: slugify(item),
    level: 2,
    value: item,
  }));
}

export function populateExamplesToc({
  metadata,
  propsTable,
  codeExamples,
}: Pick<ComponentPageProps, 'metadata' | 'propsTable'> &
  Pick<ComponentPageFields, 'codeExamples'>) {
  let temp = [] as TOCItem[];
  if (metadata?.toc) {
    temp = [...metadata.toc, ...temp];
  }

  if (propsTable?.toc) {
    temp = [...propsTable.toc, ...temp];
  }

  if (codeExamples) {
    const codeExamplesToc = codeExamples
      // in case the code example is empty
      .filter((example) => example.fields?.title)
      .map(
        (example): TOCItem => ({
          id: slugify(example.fields.title),
          level: 3,
          value: example.fields.title,
        }),
      );

    temp = [{ id: 'examples', level: 2, value: 'Examples' }, ...codeExamplesToc, ...temp];
  }
  return temp;
}
