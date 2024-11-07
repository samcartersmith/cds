import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import fs from 'node:fs';
import { writePrettyFile } from '@cbhq/script-utils';

import { AdopterComponents, ComponentData } from '../../../components/AdoptionTracker/types';
import sidebarConfig from '../../../sidebar.config';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

type SidebarItem = { label: string; items?: SidebarItem[] };

function getImportPaths(details: ComponentData[]): string[] {
  const sourceFiles: string[] = [];
  details.forEach((cmptData) => {
    const { sourceFile } = cmptData;
    if (!sourceFiles.includes(sourceFile)) {
      sourceFiles.push(sourceFile);
    }
  });

  return sourceFiles;
}

function getComponentsList() {
  const config = sidebarConfig as unknown as {
    docs: SidebarItem[];
  };
  return config.docs.reduce((acc: string[], item) => {
    if (['Components', 'Abstract Components'].includes(item.label)) {
      item.items?.forEach((parent) => {
        if (parent.items) {
          parent.items.forEach((child) => {
            acc.push(upperFirst(camelCase(child.label)));
          });
        } else {
          acc.push(upperFirst(camelCase(parent.label)));
        }
      });
    }
    return acc;
  }, []);
}

export async function getListOfComponentsAndImports() {
  // get components.json files
  const componentJSONFiles: string[] = await glob(
    `apps/website/static/data/__generated__/adoption/*/components.json`,
    {
      absolute: true,
      cwd: MONOREPO_ROOT,
      onlyFiles: true,
    },
  );

  // get the array of component data for each components.json
  const arrayOfComponentDataPerFile = await Promise.all(
    componentJSONFiles.map(async (filePath) => {
      const cmptData = JSON.parse(
        await fs.promises.readFile(filePath, 'utf8'),
      ) as AdopterComponents;

      return cmptData.cds;
    }),
  );

  // get component data
  const components = arrayOfComponentDataPerFile.flat();
  const groupedComponents = groupBy(components, 'name');
  const componentInstances = toPairs(groupedComponents).map(([name, details]) => ({
    name,
    importPaths: getImportPaths(details).join(', '),
    totalInstances: details.reduce((acc, { totalInstances }) => acc + totalInstances, 0),
  }));
  const cmptList = getComponentsList();
  const data = componentInstances.filter((component) => cmptList?.includes(component.name));

  // write to a generated file
  const generatedFile = `${MONOREPO_ROOT}/apps/website/static/data/__generated__/adoption/componentsUsageAndImportData.json`;
  await writePrettyFile(generatedFile, `${JSON.stringify(data)}`);
}
