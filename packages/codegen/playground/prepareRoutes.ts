import glob from 'fast-glob';
import path from 'path';

import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

/**
 *
 * We need to compute the relative path given a filePath. It should
 * be relative to the 'packages/mobile/examples' folder.
 *
 * Previously, we hardcoded the relative path in
 * mobileRoutes.ejs. But with more mobile packages, stories can be live in
 * other packages other than packages/mobile. Thus, adding '../' is
 * insufficient. You can't reach mobile-visualization by going 1 folder up from
 * 'packages/mobile/examples'. You need to go 2 folders up, so you need to
 * appending '../../' to the filePath. This function determines its folder and
 * computes the correct relative path.
 *
 * @param filePath The path of the file
 * @returns The relative path. It is relative to 'packages/mobile/examples'
 */
function getRelativePath(filePath: string) {
  const relativePath = filePath.replace('.tsx', '');

  return `@cbhq/cds-${relativePath}`;
}

async function getRoutes() {
  try {
    const rootDir = getSourcePath('packages');

    // Our stories may come from other packages not within mobile, so
    // we are adding a new regular expression to capture stories that are
    // in other mobile packages
    const files = await glob(
      ['**/(mobile|mobile-visualization)/**/__stories__/*.stories.(ts|tsx|js|jsx)'],
      {
        ignore: ['__tests__/*'],
        onlyFiles: true,
        cwd: rootDir,
        absolute: false,
      },
    );

    const processedFiles = files
      .map((file) => {
        return {
          name: path.basename(file, '.stories.tsx'),
          path: getRelativePath(file),
        };
      })
      .sort((prev, next) => prev.name.localeCompare(next.name));

    return processedFiles;
  } catch {
    throw new Error(`Failed to get files in mobile-playground/src/screens`);
  }
}

export async function prepare() {
  try {
    const routes = await getRoutes();
    const baseTemplateConfig = {
      data: { routes },
      template: 'mobileRoutes.ejs',
    };

    // Write to ui-mobile-playground package
    await writeFile({
      ...baseTemplateConfig,
      dest: `packages/ui-mobile-playground/src/components/routes.ts`,
    });

    // Write to ui-mobile-visreg package
    await writeFile({
      ...baseTemplateConfig,
      dest: `packages/ui-mobile-visreg/src/routes.ts`,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      throw err;
    }
  }
}

void prepare();
