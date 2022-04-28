/* eslint-disable guard-for-in */
import camelCase from 'lodash/camelCase';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import path from 'path';

import { aliasTypesMap, docgenParser, parentTypesMap } from './docgenParser';
import type { DocgenWriterParams, WriteFileConfig } from './docgenWriter';

type DocConfig = Record<
  string,
  { tsconfigPath: string; sourceFile: string; packageName: string }[]
>;

export type DocgenParserParams = {
  id?: string;
  alias: string;
  components: DocConfig;
  utils?: DocConfig;
  hooks?: DocConfig;
  parserConfig: {
    parentTypes?: string[];
    propsToForceIncludeIfPresent?: string[];
    aliasesToExtractValuesFor?: string[];
  };
  outputDir: string;
};

function asObject(val: Map<string, unknown>) {
  return Object.fromEntries(val);
}

const templatesDir = path.join(__dirname, '../templates');
const componentsTemplate = path.join(templatesDir, 'component.ejs.t');
const objectMapTemplate = path.join(templatesDir, 'objectMap.ejs.t');

/**
 * Takes config passed into plugin and runs docgenParser.
 * Returns array of configs to be passed into docgenWriter, which will write the files to disk.
 */
export async function docgenRunner({
  alias,
  components,
  parserConfig,
  outputDir,
}: DocgenParserParams): Promise<DocgenWriterParams> {
  const docsData: WriteFileConfig[] = [];
  mapValues(components, (value, id) => {
    /**
     * Array of parsed docs
     * [ {name: 'Accordion', packageName: 'web' }, {name: 'Accordion', packageName: 'mobile' }]
     */
    const flattenedData = flatten(value.map((item) => docgenParser(item, parserConfig)));
    /**
     * Grouped data based on config
     * { Accordion: [ {name: 'Accordion', packageName: 'web'}, {name: 'Accordion', packageName: 'mobile'} ]}
     */
    const groupedData = groupBy(flattenedData, 'name');
    for (const name in groupedData) {
      const componentsForGroup = groupedData[name];
      const packageGroup = groupBy(componentsForGroup, 'packageName');
      for (const packageName in packageGroup) {
        const dataForPlatform = packageGroup[packageName];
        for (const data of dataForPlatform) {
          docsData.push({
            dest: `${id}/${packageName}/_${camelCase(name)}.mdx`,
            data,
            template: componentsTemplate,
          });
        }
      }
    }
  });

  const groupedParentTypes = mapValues(
    groupBy(Array.from(parentTypesMap.values()), 'parent'),
    (val) => keyBy(val, 'name'),
  );

  return {
    alias,
    outputDir,
    files: [
      ...docsData,
      {
        dest: `data/parentTypes.js`,
        data: { parentTypes: groupedParentTypes },
        template: objectMapTemplate,
      },
      {
        dest: `data/aliasTypes.js`,
        data: { aliasTypes: asObject(aliasTypesMap) },
        template: objectMapTemplate,
      },
    ],
  };
}
