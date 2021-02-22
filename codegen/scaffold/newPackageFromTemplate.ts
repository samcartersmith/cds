import * as chalk from 'chalk';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as glob from 'fast-glob';
import { existsSync, promises as fs } from 'fs';
import * as path from 'path';
import { argv } from 'yargs';

const name = argv.name as string;
const root = argv.root as string;

if (!name) {
  throw new Error('New package name must be provided.');
} else if (name.startsWith('@')) {
  throw new Error('Package name must not start with @cbhq scope.');
} else if (!name.match(/[-a-z0-9]+/)) {
  throw new Error('Package name must be in kebab-case.');
}

const TEMPLATE_ROOT = path.join(root, '_template');
const PACKAGE_ROOT = path.join(root, name);

async function newPackage() {
  const files = await glob('**/*', { cwd: TEMPLATE_ROOT, onlyFiles: true });

  if (existsSync(PACKAGE_ROOT)) {
    throw new Error(`Package ${name} already exists!`);
  }

  console.log(chalk.cyan(`Copying template to ${PACKAGE_ROOT}`));

  await fs.mkdir(PACKAGE_ROOT);

  await Promise.all(
    files.map(async file => {
      // Read file and replace tokens
      let source = await fs.readFile(path.join(TEMPLATE_ROOT, file), 'utf8');

      source = source.replace(/(<package>|_template)/g, name);

      // Write file and create directories
      const targetPath = path.join(PACKAGE_ROOT, file);

      if (path.dirname(targetPath) !== PACKAGE_ROOT) {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
      }

      await fs.writeFile(targetPath, source, 'utf8');

      console.log(`Copied ${file}`);
    })
  );

  console.log(chalk.green('New package created!'));
}

newPackage().catch(error => {
  console.error(chalk.red(error));
});
