import chalk from 'chalk';
import glob from 'fast-glob';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { argv } from 'yargs';

const name = argv.name as string;
const description = argv.description as string;
const root = argv.root as string;

if (!name) {
  throw new Error('New package name must be provided.');
} else if (name.startsWith('@')) {
  throw new Error('Package name must not start with @cbhq scope.');
} else if (!name.match(/[-a-z0-9]+/)) {
  throw new Error('Package name must be in kebab-case.');
} else if (!description) {
  throw new Error('Package must have a description');
}

const TEMPLATE_ROOT = path.join(root, 'codegen/templates/newPackage');
const PACKAGE_ROOT = path.join(root, name);

async function newPackage() {
  const files = await glob('**/*', { cwd: TEMPLATE_ROOT, onlyFiles: true, dot: true });

  if (existsSync(PACKAGE_ROOT)) {
    throw new Error(`Package ${name} already exists!`);
  }

  console.log(chalk.cyan(`Copying template to ${PACKAGE_ROOT}`));

  await fs.mkdir(PACKAGE_ROOT);

  await Promise.all(
    files.map(async file => {
      // Read file and replace tokens
      let source = await fs.readFile(path.join(TEMPLATE_ROOT, file), 'utf8');

      source = source.replace(/(<package>)/g, name);
      source = source.replace(/(<description>)/g, description);

      // Write file and create directories
      const targetPath = path.join(PACKAGE_ROOT, file);

      if (path.dirname(targetPath) !== PACKAGE_ROOT) {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
      }

      await fs.writeFile(targetPath, source, 'utf8');

      console.log(`Copied ${file}`);
    }),
  );

  console.log(chalk.green('New package created!'));
}

newPackage().catch(error => {
  console.error(chalk.red(error));
});
