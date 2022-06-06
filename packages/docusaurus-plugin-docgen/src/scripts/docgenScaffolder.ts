import fs from 'fs';
import groupBy from 'lodash/groupBy';
import kebabCase from 'lodash/kebabCase';
import orderBy from 'lodash/orderBy';
import startCase from 'lodash/startCase';
import uniqBy from 'lodash/uniqBy';
import path from 'path';
import type { OutputDoc, PluginOptions, WriteFileConfig } from '@cbhq/docusaurus-plugin-docgen';

import { logger } from '../utils/logger';

type DocgenScaffolderParams = Pick<PluginOptions, 'docsDir' | 'forceDocs'> & {
  docs: Set<OutputDoc>;
};

export function docgenScaffolder({ docsDir = 'docs', forceDocs, docs }: DocgenScaffolderParams) {
  const filesToWriteToDisk: WriteFileConfig[] = [];

  const partials = orderBy(Array.from(docs.values()), ['mdxImport.name']);
  const groupedDocs = groupBy(partials, 'slug');

  Object.entries(groupedDocs).forEach(([slug, dataForGroup]) => {
    const { displayName } = dataForGroup[0];
    const [subdir, component, maybeComponentFile] = slug.split('/');
    const outputDir = path.join(docsDir, subdir, maybeComponentFile ?? component);
    const kebabCaseName = kebabCase(displayName);
    const docDest = path.join(outputDir, `${kebabCaseName}.mdx`);

    const addToFilesToWrite = () => {
      const data = {
        title: startCase(displayName),
        kebabCaseName,
        docs: uniqBy(dataForGroup, 'partial.name'),
        hasA11y: fs.existsSync(path.join(outputDir, '_a11y.mdx')),
        hasIntro: fs.existsSync(path.join(outputDir, '_intro.mdx')),
        hasUsage: fs.existsSync(path.join(outputDir, '_usage.mdx')),
        hasExample: fs.existsSync(path.join(outputDir, '_example.mdx')),
        hasDesign: fs.existsSync(path.join(outputDir, '_design.mdx')),
        hasImplementation: fs.existsSync(path.join(outputDir, '_implementation.mdx')),
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
