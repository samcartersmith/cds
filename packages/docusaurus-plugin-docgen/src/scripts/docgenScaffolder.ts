import fs from 'fs';
import { startCase } from 'lodash';
import groupBy from 'lodash/groupBy';
import kebabCase from 'lodash/kebabCase';
import orderBy from 'lodash/orderBy';
import path from 'path';

import { logger } from '../utils/logger';

import { WriteFileConfig } from './docgenWriter';
import type { DocgenPluginOptions, OutputDoc } from './types';

type DocgenScaffolderParams = Pick<DocgenPluginOptions, 'docsDir' | 'forceDocs'> & {
  docs: Set<OutputDoc>;
};

export function docgenScaffolder({ docsDir = 'docs', forceDocs, docs }: DocgenScaffolderParams) {
  const filesToWriteToDisk: WriteFileConfig[] = [];

  const partials = orderBy(Array.from(docs.values()), ['mdxImport.name']);
  const groupedDocs = groupBy(partials, 'slug');

  Object.entries(groupedDocs).forEach(([slug, dataForGroup]) => {
    const { displayName } = dataForGroup[0];
    const outputDir = path.join(docsDir, slug);
    const docDest = path.join(outputDir, `${kebabCase(displayName)}.mdx`);

    const addToFilesToWrite = () => {
      const data = {
        title: startCase(displayName),
        docs: dataForGroup,
        hasA11y: fs.existsSync(path.join(outputDir, '_a11y,mdx')),
        hasIntro: fs.existsSync(path.join(outputDir, '_intro,mdx')),
        hasUsage: fs.existsSync(path.join(outputDir, '_usage,mdx')),
        hasExample: fs.existsSync(path.join(outputDir, '_example,mdx')),
        hasDesign: fs.existsSync(path.join(outputDir, '_design,mdx')),
        hasImplementation: fs.existsSync(path.join(outputDir, '_implementation,mdx')),
      };

      filesToWriteToDisk.push({
        dest: docDest,
        data,
        template: 'doc/component',
      });

      filesToWriteToDisk.push({
        dest: path.join(outputDir, `_implementation.mdx`),
        data,
        template: 'doc/implementation',
      });
    };

    try {
      if (fs.existsSync(docDest)) {
        if ((Array.isArray(forceDocs) && forceDocs.includes(displayName)) || forceDocs === true) {
          logger.forceIsTrue();
          addToFilesToWrite();
        } else {
          logger.forceIsFalse(docDest);
        }
      } else {
        logger.preppingDoc(displayName);
        addToFilesToWrite();
      }
    } catch (err) {
      logger.preppingDoc(displayName);
      addToFilesToWrite();
    }
  });

  return filesToWriteToDisk;
}
