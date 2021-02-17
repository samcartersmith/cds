import axios from 'axios';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as ora from 'ora';
import * as path from 'path';
import { promisify } from 'util';

import { ComponentMetadata } from '../figma/api';
import { FigmaClient } from '../figma/client';
import { getSourcePath } from '../utils/getSourcePath';

const CDS_UTILITY_ACCT_PERSONAL_ACCESS_TOKEN = '152081-24342ed1-00c8-449d-a736-eeec18ef9348';
const ICONS_FILE_ID = 'ZPu9gtLB5KTkzazHcf9Sfi';
const NODE_ID = '1107:22364';

const figmaClient = FigmaClient(CDS_UTILITY_ACCT_PERSONAL_ACCESS_TOKEN);
const writeFile = promisify(fs.writeFile);

type IconName = {
  size: string;
  name: string;
  style: string;
};

const normalizeIconName = (imageName: string): IconName | void => {
  const [type, specificName] = imageName.split('/');
  if (type !== 'Icon') {
    return;
  }
  const [name, size, style] = specificName.split('_');
  return {
    size,
    name,
    style,
  };
};

const sync = async () => {
  const spinner = ora(
    `Synchronizing ${chalk.bold.blueBright('CDS Icons')} with figma file ${chalk.bold(
      'ZPu9gtLB5KTkzazHcf9Sfi'
    )}...`
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
          'error'
        )} No icon components found at node id ${NODE_ID}. Please verify that the figma file or figma APIs haven't changed.`
      );
      return;
    }
    const { components } = iconsFileNode;
    // Filter out non icon components
    const iconsInfo: { [key: string]: IconName } = {};
    const iconComponents: { [key: string]: ComponentMetadata } = {};
    for (const id in components) {
      const component = components[id];
      const info = normalizeIconName(component.name);
      if (info) {
        iconsInfo[id] = info;
        iconComponents[id] = component;
      }
    }
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
    const requests = Object.values(images).map(url => axios.get(url));
    const responses = await Promise.all(requests);
    spinner.text = 'Write svg icons to files.';

    const OUT_DIR = await getSourcePath('codegen/icons/svg');
    if (fs.existsSync(OUT_DIR)) {
      fs.rmdirSync(OUT_DIR, { recursive: true });
    }
    fs.mkdirSync(OUT_DIR);

    const writePromises: (Promise<unknown> | undefined)[] = responses.map((res, index) => {
      const id = iconIds[index];
      if (!res.data) {
        delete iconComponents[id];
        return;
      }
      const { name, size, style } = iconsInfo[id];
      return writeFile(path.join(OUT_DIR, `${[name, size, style].join('-')}.svg`), res.data);
    });

    writePromises.push(
      writeFile(
        await getSourcePath('codegen/icons/iconsManifest.json'),
        JSON.stringify(iconComponents, null, 2)
      )
    );

    await Promise.all(writePromises);

    spinner.succeed(
      `${chalk.greenBright('success')} Downloaded CDS ${
        Object.keys(iconComponents).length
      } icons to ${OUT_DIR}.`
    );
  } catch (error) {
    spinner.fail(`${chalk.redBright('failed')}`);
    console.error(error);
  }
};

sync();
