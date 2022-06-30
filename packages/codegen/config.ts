import enquirer from 'enquirer';
import { command, Options } from 'execa';
import fs from 'fs';
import Logger from 'hygen/dist/logger';
import { RunnerConfig } from 'hygen/dist/types';
import { camelCase } from 'lodash';
import path from 'path';
import { kebabCase, pascalCase, toCssVar, toCssVarFn } from '@cbhq/cds-utils';
import { writePrettyFile } from '@cbhq/cds-web-utils';

import { formatTemplateType } from './utils/formatTemplateType';
import { getHeaderCommentForFileType } from './utils/getHeaderCommentForFileType';
import { getPrettierParser } from './utils/getPrettierParser';

const root = path.resolve(__dirname, '../..');
const templates = path.join(root, 'packages/codegen/templates');

type WriteFileConfig = {
  defaultExport?: boolean;
  commonJS?: boolean;
  disableAsConst?: boolean;
  disableStringify?: boolean;
  disablePrettier?: boolean;
  sort?: boolean;
};

/** Custom write file fn for hygen to format contents with prettier and add header comment. */
async function writeFile(dest: string, contents: string, { config }: { config?: string }) {
  const { disablePrettier } = (config ? JSON.parse(config) : {}) as WriteFileConfig;
  try {
    const ext = path.extname(dest);
    const newContents = getHeaderCommentForFileType(ext) + contents;
    const dirForFile = path.dirname(dest);
    // If directory doesn't already exist, create it.
    fs.mkdirSync(dirForFile, { recursive: true });
    if (disablePrettier) {
      await fs.promises.writeFile(dest, newContents, { encoding: 'utf8', flag: 'w' });
    } else {
      await writePrettyFile({
        outFile: dest,
        contents: newContents,
        logInfo: false,
        parser: getPrettierParser(ext),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`Couldn't generate ${dest}.`);
    } else {
      throw error;
    }
  }
}

/** Accessible in templates directly.
 * @example
 * ```sh
 * ---
 * to: packages/common/internal/data/iconData.ts
 * force: true
 * ---
 * <%- include(partial.objectMap, { data: iconData }); %>
 * ```
 */
const localsDefaults = {
  partial: {
    css: path.join(templates, `partials/css.ejs.t`),
    cssMap: path.join(templates, `partials/cssMap.ejs.t`),
    cssDeviceMap: path.join(templates, `partials/cssDeviceMap.ejs.t`),
    cssSpacingDeviceMap: path.join(templates, `partials/cssSpacingDeviceMap.ejs.t`),
    objectMap: path.join(templates, `partials/objectMap.ejs.t`),
    typescript: path.join(templates, `partials/typescript.ejs.t`),
  },
};

/**
 *
 * @param prefix - the prefix you want the css variable to use. This will be the broader cateogry a token belongs to like sizing or palette.
 * @param alias - the alias for this token. i.e. rounded or xs
 * @returns string - the final css variable
 */
function getCssAlias(prefix: string, alias: string) {
  return `${kebabCase(prefix)}-${alias}`;
}

function toCssVarSetter(prefix: string, alias: string) {
  return toCssVar(getCssAlias(prefix, alias));
}

function toCssVarGetter(prefix: string, alias: string) {
  return toCssVarFn(getCssAlias(prefix, alias));
}

/**
 * Add any helpers you want to have accessible in hygen templates i.e `h.camelCase`
 * @link http://www.hygen.io/docs/templates
 * @example
 * ```sh
 * ---
 * to: apps/website/docs/components/<%- h.pascalCase(name) %>.tsx
 * force: true
 * ---
 * ```
 */
const helpers = {
  camelCase,
  kebabCase,
  format: formatTemplateType,
  pascalCase,
  toCssVarGetter,
  toCssVarSetter,
};

export const config: RunnerConfig = {
  cwd: root,
  templates,
  logger: new Logger(console.log.bind(console)),
  debug: !!process.env.DEBUG,
  exec: (action: string, body: string) => {
    const opts: Options<string> = { input: body && body.length > 0 ? body : '' };
    return command(action, { ...opts, shell: true });
  },
  // @ts-expect-error Enquirer types are narrower then hygen prompter types
  createPrompter: () => enquirer,
  localsDefaults,
  helpers,
  writeFile,
};
