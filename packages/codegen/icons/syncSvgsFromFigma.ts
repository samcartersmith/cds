import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import path from 'path';
import { camelCase, capitalize, entries, pascalCase, renameKeys } from '@cbhq/cds-utils/index';

import { ComponentMetadata } from '../figma/api';
import { FigmaClient } from '../figma/client';
import { buildTemplates } from '../utils/buildTemplates';
import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

import { createIconSet } from './createIconSet';
import { createUnicodeMap } from './createUnicodeMap';
import { fillMissingIcons } from './fillMissingIcons';

const CDS_UTILITY_ACCT_PERSONAL_ACCESS_TOKEN = '231423-67598884-1ffe-4c9d-8c42-f0f407d93f6e';
const ICONS_FILE_ID = 'ZPu9gtLB5KTkzazHcf9Sfi';
const NODE_ID = '1107:22364';

const figmaClient = FigmaClient(CDS_UTILITY_ACCT_PERSONAL_ACCESS_TOKEN);

type IconName = {
  size: string;
  name: string;
  state: string;
};

const categorizedIconNames: Record<string, Set<string>> = {
  Icon: new Set(),
  NavigationIcon: new Set(),
  NavigationIconInternal: new Set(),
};

const normalizeIconName = (imageName: string): IconName | undefined => {
  const [type, specificName, state] = imageName.split('/');
  if (type !== 'Icon' && type !== 'NavigationIcon' && type !== 'NavigationProductIcon') {
    return undefined;
  }

  const [name, size] = specificName.split('_');
  const stateStr = state === undefined ? '' : capitalize(state);
  if (type === 'NavigationIcon' || type === 'NavigationProductIcon') {
    categorizedIconNames.NavigationIconInternal.add(`${name}${stateStr}`);
    categorizedIconNames.NavigationIcon.add(`${name}`);
  }

  if (type === 'Icon' || type === 'NavigationProductIcon') {
    categorizedIconNames.Icon.add(`${name}${stateStr}`);
  }

  return {
    size,
    name,
    state,
  };
};

const createCategorizedNameType = (): Record<string, string[]> => {
  const toCategoryArrMap = Object.entries(categorizedIconNames).reduce((res, nameInfo) => {
    const [type, nameSet] = nameInfo;
    res[type] = Array.from(nameSet.values());
    return res;
  }, {} as Record<string, string[]>);
  return toCategoryArrMap;
};

async function syncIcons() {
  const { nameSet, sizeMap } = createIconSet();
  const spinner = ora(
    `Synchronizing ${chalk.bold.blueBright('CDS Icons')} with figma file ${chalk.bold(
      'ZPu9gtLB5KTkzazHcf9Sfi',
    )}...`,
  ).start();
  try {
    spinner.text = 'GET file node data from figma API.';
    const {
      data: {
        nodes: { [NODE_ID]: iconsFileNode },
      },
    } = await figmaClient.node(ICONS_FILE_ID, NODE_ID);
    if (!iconsFileNode) {
      spinner.fail(
        `${chalk.redBright(
          'error',
        )} No icon components found at node id ${NODE_ID}. Please verify that the figma file or figma APIs haven't changed.`,
      );
      return;
    }
    const { components } = iconsFileNode;
    // Filter out non icon components
    const iconsInfo: Record<string, IconName> = {};
    const iconComponents: Record<string, ComponentMetadata> = {};
    Object.keys(components).forEach((id) => {
      const component = components[id];
      const info = normalizeIconName(component.name);
      if (info) {
        iconsInfo[id] = info;
        iconComponents[id] = component;
      }
    });
    createCategorizedNameType();

    const iconIds = Object.keys(iconsInfo);
    spinner.text = `GET image urls for ${iconIds.length} icons in the figma node.`;
    const {
      data: { err: imageError, images },
    } = await figmaClient.fileImages(ICONS_FILE_ID, iconIds);
    if (imageError) {
      spinner.fail(`${chalk.redBright('error')} Failed to get images from the figma API.`);
      console.error(imageError);
      return;
    }
    spinner.text = 'Download svg images from urls in parallel.';
    const requests = Object.values(images).map(async (url) => axios.get(url));
    const responses = await Promise.all(requests);
    spinner.text = 'Write svg icons to files.';
    const OUT_DIR = await getSourcePath('codegen/icons/svg');
    if (fs.existsSync(OUT_DIR)) {
      fs.rmdirSync(OUT_DIR, { recursive: true });
    }
    fs.mkdirSync(OUT_DIR);

    const writePromises: (Promise<unknown> | undefined)[] = [];

    responses.forEach((res, index) => {
      const id = iconIds[index];
      if (!res.data) {
        delete iconComponents[id];
        return;
      }
      const { name, size, state = '' } = iconsInfo[id];
      const camelCaseName = camelCase(`${name} ${state}`);
      nameSet.add(camelCaseName);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sizeMap[size][camelCaseName] = res.data;
    });

    fillMissingIcons(nameSet, sizeMap);

    const { unicodeMap, lastUnicode } = createUnicodeMap(nameSet);
    entries(unicodeMap).forEach(([name, sizes]) => {
      Object.keys(sizes).forEach((size) => {
        const unicode = sizes[Number(size)] as string;
        const fileName = `${unicode}-${name}-${size}.svg`;
        if (sizeMap[size][name]) {
          writePromises.push(
            fs.promises.writeFile(path.join(OUT_DIR, fileName), sizeMap[size][name] as string),
          );
        } else {
          throw new Error(`Please update manifest to remove or rename ${name}`);
        }
      });
    });

    const toCategoryArrMap = createCategorizedNameType();

    const newTypeNamesMap = (type: 'pascalCase' | 'camelCase') => {
      return Object.keys(toCategoryArrMap).reduce((acc, oldKey) => {
        if (type === 'camelCase') {
          acc[oldKey] = camelCase(`${oldKey} Names`);
        }

        if (type === 'pascalCase') {
          acc[oldKey] = pascalCase(`${oldKey} name`);
        }

        return acc;
      }, {} as Record<string, string>);
    };

    writePromises.push(
      writeFile({
        template: 'typescript.ejs',
        dest: 'common/types/IconName.ts',
        data: {
          types: renameKeys(toCategoryArrMap, newTypeNamesMap('pascalCase')),
        },
      }),
    );

    delete toCategoryArrMap.NavigationIconInternal;

    const iconData = {
      iconSizes: ['xs', 's', 'm', 'l'],
      navigationIconSizes: ['s', 'm', 'l'],
      ...renameKeys(toCategoryArrMap, newTypeNamesMap('camelCase')),
    };

    const templates = {
      'objectMap.ejs': [
        {
          dest: 'common/internal/data/iconData.ts',
          data: {
            ...iconData,
            unicodeMap,
          },
        },
      ],
    };

    writePromises.push(buildTemplates(templates));

    writePromises.push(
      writeFile({
        template: 'objectMap.ejs',
        data: { manifest: { lastUnicode, unicodeMap } },
        config: { disableAsConst: true },
        dest: 'codegen/icons/manifest.ts',
      }),
    );

    writePromises.push(
      writeFile({
        template: 'objectMap.ejs',
        data: { iconManifest: iconComponents },
        config: { disableAsConst: true },
        dest: 'codegen/icons/iconManifest.ts',
      }),
    );

    await Promise.all(writePromises);

    spinner.succeed(
      `${chalk.greenBright('success')} Downloaded CDS ${
        Object.keys(iconComponents).length
      } icons to ${OUT_DIR}.`,
    );
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(`${chalk.redBright('failed')}`);
      console.error(error);
    } else {
      throw error;
    }
  }
}

void syncIcons();
