import { TOCItem } from '@docusaurus/types';
import slugify from '@cbhq/docusaurus-theme/src/utils/slugify';

import type { ComponentPageFields, ComponentPageProps } from './pages/ComponentPage';

export function populateGuidelinesToc(fields: ComponentPageFields) {
  const toc = [];

  if (fields.principles) {
    toc.push('Principles');
  }
  if (fields.usage) {
    toc.push('Usage');
  }
  if (fields.anatomy) {
    toc.push('Anatomy');
  }
  if (fields.spacing) {
    toc.push('Spacing');
  }
  if (fields.sizing) {
    toc.push('Sizing');
  }
  if (fields.behavior) {
    toc.push('Behavior');
  }
  if (fields.illustration) {
    toc.push('Illustration');
  }
  if (fields.content) {
    toc.push('Content');
  }
  if (fields.callToAction) {
    toc.push('Call to action');
  }
  if (fields.motion) {
    toc.push('Motion');
  }
  if (fields.accessibility) {
    toc.push('Accessibility');
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
  staticExamples,
}: Pick<ComponentPageProps, 'metadata' | 'propsTable' | 'staticExamples'> &
  Pick<ComponentPageFields, 'codeExamples'>) {
  let temp = [] as TOCItem[];
  if (metadata?.toc) {
    temp = [...metadata.toc, ...temp];
  }

  if (propsTable?.toc) {
    temp = [...propsTable.toc, ...temp];
  }
  if (staticExamples?.toc) {
    temp = [...staticExamples.toc, ...temp];
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

    temp = [...codeExamplesToc, ...temp];
  }

  if (codeExamples || staticExamples) {
    // add examples as first toc item
    temp.unshift({ id: 'examples', level: 2, value: 'Examples' });
  }

  return temp;
}
