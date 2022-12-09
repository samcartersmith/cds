import fs from 'node:fs';
import path from 'node:path';
import { Task } from '@cbhq/mono-tasks';
import {
  existsOrCreateDir,
  getAbsolutePath,
  getRelativePath,
  tokensTemplate,
  writePrettyFile,
} from '@cbhq/script-utils';

import { ColorStyles } from '../tools/ColorStyles';
import { Component } from '../tools/Component';
import type { ComponentSetChild } from '../tools/ComponentSetChild';

import { getRemoteSvg } from './getRemoteSvg';
import { getSvgData } from './getSvgData';
import { getSvgMarkup } from './getSvgMarkup';

export type GenerateSvgsTaskOptions = {
  /** The directory to output generated svgs */
  generatedSvgsDirectory: string;
  /** The directory to output generated js version of svgs. */
  generatedSvgsJsDirectory?: string;
  /** The file to output a generated lookup file. */
  generatedSvgsJsMapFile?: string;
  /** If the manifest.json file should track versions for any updates. */
  manifestVersioning?: boolean;
};

type GenerateSvgsTask<Options extends GenerateSvgsTaskOptions = GenerateSvgsTaskOptions> =
  Task<Options>;

export type SvgFileNameParts = { fileName: string; lookupName: string };

export type SvgItemShape = Component | ComponentSetChild;

export type SvgOutputCategory = 'light' | 'dark' | 'themeable';

export type SvgOutputShape<Item extends SvgItemShape> = {
  relativeFilePath: string;
  filePath: string;
  fileContent: string;
  item: Item;
  writeParams?: { prettier: boolean };
};

export type SvgsJsLookupOutputShape = {
  relativeFilePath: string;
  filePath: string;
  fileContent: string;
};

function svgContentParser<Item extends SvgItemShape>({
  colorStyles,
  remoteSvgs,
}: SvgsGeneratorParams<Item>) {
  return async function getSvgContent(item: SvgItemShape) {
    let lightContent = '';
    let darkContent: string | undefined;
    let themeableContent: string | undefined;

    if (remoteSvgs) {
      const remoteUrl = remoteSvgs[item.id];
      const resp = await getRemoteSvg(remoteUrl);
      if (resp) {
        lightContent = resp;
        darkContent = colorStyles?.replaceLightWithDarkFills(lightContent);
        themeableContent = colorStyles?.replaceWithCssVariables(lightContent);
      }
    } else if (item.node) {
      const data = getSvgData(item.node, colorStyles);
      const svgMarkup = getSvgMarkup(data);
      lightContent = svgMarkup.light;
      darkContent = svgMarkup?.dark;
      themeableContent = colorStyles?.replaceWithCssVariables(lightContent);
    }

    return {
      lightContent,
      darkContent,
      themeableContent,
    };
  };
}

function getSvgNamePartsFallback<
  Item extends SvgItemShape,
  TaskType extends GenerateSvgsTask = GenerateSvgsTask,
>(task: TaskType, item: Item) {
  const lookupName = `${item.type}-${item.name}`;
  let fileName = lookupName;

  if (task.options.manifestVersioning) {
    // TODO: add lookup to mapping of old versions
    fileName = `${lookupName}-${item.version}`;
  }

  return { fileName: `${fileName}.svg`, lookupName };
}

function outputGenerator<
  Item extends SvgItemShape,
  TaskType extends GenerateSvgsTask = GenerateSvgsTask,
>({ task, getSvgNameParts = getSvgNamePartsFallback }: SvgsGeneratorParams<Item, TaskType>) {
  const [generatedSvgsDirectory, generatedSvgsJsDirectory, generatedSvgsJsMapFile] = [
    task.options.generatedSvgsDirectory,
    task.options.generatedSvgsJsDirectory,
    task.options.generatedSvgsJsMapFile,
  ].map((item) => getAbsolutePath(task, item));

  const svgsJsLookupObject: Record<string, string> = {};

  function getSvgJsMapFileOutput(filePath: string) {
    return (): SvgsJsLookupOutputShape => {
      const { name: exportName } = path.parse(filePath);

      const fileContent = tokensTemplate`      
      /* eslint-disable import/extensions */
      /* eslint-disable global-require */
      /* eslint-disable @typescript-eslint/no-unsafe-return */

      export const ${exportName}: Record<string, () => string> = ${svgsJsLookupObject}
      `;

      return {
        fileContent,
        filePath,
        relativeFilePath: getRelativePath(task, filePath), // for tracking outputs in manifest file
      };
    };
  }

  function getOuputsForItem(item: Item) {
    const outputs: SvgOutputShape<Item>[] = [];

    function addOutput(content: string, category?: SvgOutputCategory) {
      if (!generatedSvgsDirectory) return;

      const { fileName, lookupName } = getSvgNameParts(task, item);

      const filePath = category
        ? `${generatedSvgsDirectory}/${category}/${fileName}`
        : `${generatedSvgsDirectory}/${fileName}`;

      const relativeFilePath = getRelativePath(task, filePath);

      const svgOutput = {
        filePath,
        relativeFilePath,
        fileContent: content,
        item,
      };

      outputs.push(svgOutput);

      if (generatedSvgsJsDirectory) {
        const svgJsFilePath = filePath
          .replace(generatedSvgsDirectory, generatedSvgsJsDirectory)
          .replace('.svg', '.js');

        const svgJsOutput = {
          filePath: svgJsFilePath,
          relativeFilePath: getRelativePath(task, svgJsFilePath),
          fileContent: `module.exports = { content: \`${content}\` };`,
          item,
          writeParams: { prettier: false },
        };

        outputs.push(svgJsOutput);

        if (generatedSvgsJsMapFile) {
          // Compute the relative path of the SVG file based on the two absolute paths
          const relativeSvgFilePath = path.relative(
            path.dirname(generatedSvgsJsMapFile),
            svgJsOutput.filePath,
          );
          const lookupContent = `() => require('./${relativeSvgFilePath}').content`;
          const lookupKey = category ? `${category}-${lookupName}` : lookupName;
          // TODO: should maybe have separate loopup maps for each category
          if (category !== 'themeable') {
            svgsJsLookupObject[lookupKey] = lookupContent;
          }
        }
      }
    }

    return {
      outputs,
      addOutput,
    };
  }

  return {
    getOuputsForItem,
    getSvgJsMapFileOutput: generatedSvgsJsMapFile
      ? getSvgJsMapFileOutput(generatedSvgsJsMapFile)
      : undefined,
  };
}

type SvgsGeneratorParams<
  Item extends SvgItemShape,
  TaskType extends GenerateSvgsTask = GenerateSvgsTask,
> = {
  colorStyles?: ColorStyles;
  remoteSvgs?: Record<string, string>;
  task: TaskType;
  getSvgNameParts?: (task: TaskType, item: Item) => SvgFileNameParts;
};

export type GeneratedSvgs = Map<string, SvgOutputShape<SvgItemShape>>;

export function svgsGenerator<Item extends SvgItemShape>(params: SvgsGeneratorParams<Item>) {
  let allOutputs: SvgOutputShape<Item>[] = [];
  return async function generateSvgs(items: Item[]) {
    const getSvgContent = svgContentParser(params);
    const { getOuputsForItem, getSvgJsMapFileOutput } = outputGenerator<Item>(params);

    await Promise.all(
      items.map(async (item) => {
        const { outputs, addOutput } = getOuputsForItem(item);
        const { lightContent, darkContent, themeableContent } = await getSvgContent(item);

        /** If we have these items we know we are create multiple svgs and will need to use sub directories  */
        if (darkContent && themeableContent) {
          addOutput(lightContent, 'light');
          addOutput(darkContent, 'dark');
          addOutput(themeableContent, 'themeable'); // this will have css-variables instead of hex colors in svg markup
        } else {
          /** Fallback to light mode version if colorStyles was not provided */
          addOutput(lightContent);
        }

        await Promise.all(
          outputs.map(async ({ relativeFilePath, filePath, fileContent, writeParams }) => {
            /**
             * Add the outputted file path to manifest data for an item.
             * This is similiar to how NX tracks inputs and outputs. By saving outputs
             * we can easily know which files we should delete if the items are removed from Figma.
             */
            item.addToOutputs(relativeFilePath);

            if (writeParams?.prettier) {
              await writePrettyFile(filePath, fileContent);
            } else {
              await existsOrCreateDir(filePath);
              await fs.promises.writeFile(filePath, fileContent);
            }
          }),
        );

        allOutputs = [...allOutputs, ...outputs];
      }),
    );

    if (getSvgJsMapFileOutput) {
      const { filePath, fileContent } = getSvgJsMapFileOutput();
      await writePrettyFile(filePath, fileContent);
    }

    const svgs: GeneratedSvgs = new Map(
      allOutputs.map((output) => [output.filePath, output] as const),
    );
    return svgs;
  };
}
