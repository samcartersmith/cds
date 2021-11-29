import glob from 'fast-glob';
import path from 'path';
import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

async function getRoutes() {
  try {
    const dir = await getSourcePath('mobile-playground/src/screens');
    const files = await glob(['**/*.(ts|tsx|js|jsx)'], {
      ignore: ['__tests__/*'],
      onlyFiles: true,
      cwd: dir,
      absolute: false,
    });
    return files.map((file) => path.basename(file, path.extname(file)));
  } catch {
    throw new Error(`Failed to get files in mobile-playground/src/screens`);
  }
}

async function prepare() {
  try {
    const codegenRoutes = await getRoutes();
    await writeFile({
      template: 'mobileRoutes.ejs',
      data: { codegenRoutes },
      dest: `mobile-playground/src/routing/codegenRoutes.ts`,
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
