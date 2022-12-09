import groupBy from 'lodash/groupBy';
import startCase from 'lodash/startCase';
import { typescriptTypesTemplate, writePrettyFile } from '@cbhq/script-utils';

import { Component } from '../tools/Component';
import { ComponentSet } from '../tools/ComponentSet';

export type GenerateTypesParams<Item extends Component | ComponentSet> = {
  outputDir: string;
  formatTypeName?: (type: string) => string;
  formatTypeValue?: (items: Item) => string | string[];
};

export async function generateTypes<Item extends Component | ComponentSet>(
  items: Item[],
  { formatTypeName, formatTypeValue, outputDir }: GenerateTypesParams<Item>,
) {
  const groupedItems = groupBy(items, 'type');
  const promises: Promise<void>[] = [];

  Object.entries(groupedItems).forEach(([type, group]) => {
    const typeName = formatTypeName?.(type) ?? startCase(type).replace(/ /g, '');
    const names = group.flatMap((item) => formatTypeValue?.(item) ?? item.name);
    const outputFile = `${outputDir}/${typeName}.ts`;
    const content = typescriptTypesTemplate`
        export type ${typeName} = ${names};
      `;
    promises.push(writePrettyFile(outputFile, content));
  });

  await Promise.all(promises);
}
