import glob from 'fast-glob';
import path from 'path';

import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

async function getRoutes() {
  try {
    const dir = await getSourcePath('mobile');
    const files = await glob(['**/__stories__/*.stories.(ts|tsx|js|jsx)'], {
      ignore: ['__tests__/*'],
      onlyFiles: true,
      cwd: dir,
      absolute: false,
    });
    return files
      .map((file) => {
        return {
          name: path.basename(file, '.stories.tsx'),
          path: file.replace('.tsx', ''),
        };
      })
      .sort((prev, next) => prev.name.localeCompare(next.name));
  } catch {
    throw new Error(`Failed to get files in mobile-playground/src/screens`);
  }
}

async function prepare() {
  try {
    const routes = await getRoutes();
    await writeFile({
      template: 'mobileRoutes.ejs',
      data: { routes },
      dest: `mobile/examples/routes.ts`,
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
