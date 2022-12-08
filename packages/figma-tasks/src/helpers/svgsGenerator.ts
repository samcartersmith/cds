import fs from 'node:fs';
import { Task } from '@cbhq/mono-tasks';
import {
  existsOrCreateDir,
  getAbsolutePath,
  getRelativePath,
  writePrettyFile,
} from '@cbhq/script-utils';

import { ColorStyles } from '../tools/ColorStyles';
import { Component } from '../tools/Component';
import type { ComponentSetChild } from '../tools/ComponentSetChild';

import { getRemoteSvg } from './getRemoteSvg';
import { getSvgData } from './getSvgData';
import { getSvgMarkup } from './getSvgMarkup';

export type GenerateSvgsTaskOptions = {
  generatedSvgsDirectory: string;
  generatedSvgsJsDirectory?: string;
};

export type SvgItemShape = Component | ComponentSetChild;

export type SvgOutputShape<Item extends SvgItemShape> = {
  relativeFilePath: string;
  filePath: string;
  fileContent: string;
  item: Item;
  writeParams?: { prettier: boolean };
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

function outputGenerator<Item extends SvgItemShape>({
  task,
  formatSvgName,
}: SvgsGeneratorParams<Item>) {
  const generatedSvgsDirectory = getAbsolutePath(task, task.options.generatedSvgsDirectory);

  return function format(item: Item) {
    const outputs: SvgOutputShape<Item>[] = [];

    function addOutput(content: string, subDirectory?: string) {
      const svgBasename = formatSvgName?.(item) ?? item.name;

      const svgName = `${svgBasename}.svg`;
      const filePath = subDirectory
        ? `${generatedSvgsDirectory}/${subDirectory}/${svgName}`
        : `${generatedSvgsDirectory}/${svgName}`;

      const svgOutput = {
        filePath,
        relativeFilePath: getRelativePath(task, filePath),
        fileContent: content,
        item,
      };

      outputs.push(svgOutput);

      if (task.options.generatedSvgsJsDirectory) {
        const generatedSvgsJsDirectory = getAbsolutePath(
          task,
          task.options.generatedSvgsJsDirectory,
        );

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
      }
    }

    return { outputs, addOutput };
  };
}

type SvgsGeneratorParams<Item extends SvgItemShape> = {
  colorStyles?: ColorStyles;
  remoteSvgs?: Record<string, string>;
  task: Task<GenerateSvgsTaskOptions>;
  formatSvgName?: (item: Item) => string;
};

export type GeneratedSvgs = Map<string, SvgOutputShape<SvgItemShape>>;

export function svgsGenerator<Item extends SvgItemShape>(params: SvgsGeneratorParams<Item>) {
  let allOutputs: SvgOutputShape<Item>[] = [];
  return async function generateSvgs(items: Item[]) {
    const getSvgContent = svgContentParser(params);
    const getOuputs = outputGenerator<Item>(params);

    await Promise.all(
      items.map(async (item) => {
        const { outputs, addOutput } = getOuputs(item);
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
            await existsOrCreateDir(filePath);

            if (writeParams?.prettier) {
              await writePrettyFile(filePath, fileContent);
            } else {
              await fs.promises.writeFile(filePath, fileContent);
            }
          }),
        );

        allOutputs = [...allOutputs, ...outputs];
      }),
    );
    const svgs: GeneratedSvgs = new Map(
      allOutputs.map((output) => [output.filePath, output] as const),
    );
    return svgs;
  };
}
