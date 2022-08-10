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

export async function prepare({ useNewTemplate }: { useNewTemplate: boolean }) {
  // Will update once we migrate retail to use @cbhq/ui-mobile-playground
  const templateConfig = useNewTemplate
    ? {
        template: 'newMobileRoutes.ejs',
        dest: `mobile/examples/newRoutes.ts`,
      }
    : {
        template: 'mobileRoutes.ejs',
        dest: `mobile/examples/routes.ts`,
      };
  try {
    const routes = await getRoutes();
    await writeFile({
      data: { routes },
      ...templateConfig,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      throw err;
    }
  }
}

void prepare({ useNewTemplate: false });
