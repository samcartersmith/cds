#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

import {
  componentTransformMap,
  hookTransformMap,
  importTransformMap,
  miscTransformMap,
  typeTransformMap,
} from '../migrations/update-8-0-0-incremental-jscodeshift/index';
import { commonPathMigrationMap } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-common-types-import-paths';
import { iconImportPathMap } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-icon-paths';
import {
  CDS_ICONS_TYPE_NAMES,
  ICON_TYPE_NAMES,
} from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-icon-types';
import { mobilePathMigrationMap } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-mobile-import-paths';
import { PALETTE_TYPES_TO_MIGRATE } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-palette-types';
import { typesWithNewPathOrRenamed } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-renamed-common-types';
import { webPathMigrationMap } from '../migrations/update-8-0-0-incremental-jscodeshift/transforms/migrate-web-import-paths';

const TRANSFORM_PATH = path.join(
  __dirname,
  '../migrations/update-8-0-0-incremental-jscodeshift/index.js',
);

async function run() {
  const args = process.argv.slice(2);
  const directory = args[0];
  const runBaseTransform = args.includes('--base');
  let platform = args.includes('--mobile') ? 'mobile' : args.includes('--web') ? 'web' : undefined;
  console.log('platform', platform);

  if (!directory) {
    console.error('Please provide a directory to run the transform on.');
    return;
  }

  if (runBaseTransform) {
    const { ignorePattern } = await inquirer.prompt([
      {
        type: 'input',
        name: 'ignorePattern',
        message:
          'Enter a glob pattern to ignore, or press enter to skip (e.g., **/node_modules/**)',
        default: '',
      },
    ]);
    console.log('Running base transform...');
    await executeJscodeshift({ directory, transformStep: 'base', ignorePattern });
    return;
  }

  if (!platform) {
    const { platform: _platform } = await inquirer.prompt([
      {
        type: 'list',
        name: 'platform',
        message: 'What platform do you want to run the transform on?',
        choices: ['web', 'mobile'],
      },
    ]);
    platform = _platform;
  }

  const { transformType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'transformType',
      message: 'What do you want to transform?',
      choices: [
        {
          name: 'Components. This will run all transforms related to the selected component, and update and promote the all relevant imports.',
          value: 'component',
        },
        {
          name: 'Hooks (e.g., useSpectrum -> useTheme, useLineHeightMap -> useTheme)',
          value: 'hooks',
        },
        {
          name: 'Import Paths (e.g., moves imports from web/mobile to common)',
          value: 'imports',
        },
        {
          name: 'Types (e.g., PaletteAlias -> ThemeVars.Color, UiIconName -> IconName)',
          value: 'types',
        },
        {
          name: 'Miscellaneous (e.g., replaces JS tokens and palette helpers with CSS variables)',
          value: 'misc',
        },
        { name: 'Everything applicable (runs all transforms)', value: 'everything' },
      ],
    },
  ]);

  switch (transformType) {
    case 'component': {
      const { componentName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentName',
          message: 'Which component do you want to transform?',
          choices: Object.keys(componentTransformMap),
        },
      ]);
      console.log(`Running transform for ${componentName}...`);
      await executeJscodeshift({
        directory,
        componentName: componentName,
        platform,
        transformStep: 'component',
      });
      break;
    }
    case 'hooks': {
      console.log('Running transform for hooks...');
      const { hookName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'hookName',
          message: 'Which hook do you want to transform?',
          choices: Object.keys(hookTransformMap),
        },
      ]);
      await executeJscodeshift({ directory, transformStep: 'hooks', platform, hookName });
      break;
    }
    case 'imports': {
      const choices = Object.keys(importTransformMap).filter((key) =>
        platform === 'mobile' ? key !== 'webImportPaths' : key !== 'mobileImportPaths',
      );
      const { importTransformName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'importTransformName',
          message: 'Which import transform do you want to run?',
          choices,
        },
      ]);
      console.log('Running transform for imports...');
      if (importTransformName === 'commonTypeImportPaths') {
        const { commonTypeName } = await inquirer.prompt([
          {
            type: 'list',
            name: 'commonTypeName',
            message:
              'This transform migrates web or mobile import paths to the common package. Which type do you want to transform?',
            choices: [...Object.keys(commonPathMigrationMap), 'all'],
          },
        ]);
        await executeJscodeshift({
          directory,
          transformStep: 'imports',
          platform,
          importTransformName,
          ...(commonTypeName === 'all' ? {} : { typeName: commonTypeName }),
        });
      } else if (
        importTransformName === 'webImportPaths' ||
        importTransformName === 'mobileImportPaths' ||
        importTransformName === 'iconImportPaths'
      ) {
        const packageName =
          importTransformName === 'webImportPaths'
            ? 'web'
            : importTransformName === 'mobileImportPaths'
            ? 'mobile'
            : 'icon';
        const packageMigrationMap =
          importTransformName === 'webImportPaths'
            ? webPathMigrationMap
            : importTransformName === 'mobileImportPaths'
            ? mobilePathMigrationMap
            : iconImportPathMap;
        const { importPath } = await inquirer.prompt([
          {
            type: 'list',
            name: 'importPath',
            message: `This transform migrates ${packageName} import paths that have changed in v8. Which import path do you want to transform?`,
            choices: [...Object.keys(packageMigrationMap), 'all'],
          },
        ]);
        await executeJscodeshift({
          directory,
          transformStep: 'imports',
          platform,
          importTransformName,
          ...(importPath === 'all' ? {} : { importPath }),
        });
      }
      break;
    }
    case 'types': {
      const { typeTransformName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'typeTransformName',
          message: 'Which type transform do you want to run?',
          choices: Object.keys(typeTransformMap),
        },
      ]);

      if (typeTransformName === 'renamedCommonTypes') {
        const { hasRunImportTransforms } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'hasRunImportTransforms',
            message:
              'Have you run the import transforms to migrate specific web or mobile import paths to the common package? If not, we will run them for you, before running the types transform.',
            default: false,
          },
        ]);
        if (!hasRunImportTransforms) {
          console.log('Running transform for imports first...');
          await executeJscodeshift({
            directory,
            transformStep: 'imports',
            platform,
            importTransformName: 'commonImportPaths',
          });
        }
      }

      const typeTransformOptions: string[] =
        typeTransformName === 'renamedCommonTypes'
          ? Object.keys(typesWithNewPathOrRenamed)
          : typeTransformName === 'iconTypes'
          ? [...new Set([...ICON_TYPE_NAMES, ...CDS_ICONS_TYPE_NAMES])]
          : typeTransformName === 'paletteTypes'
          ? Object.keys(PALETTE_TYPES_TO_MIGRATE)
          : [];

      const { typeName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'typeName',
          message: 'Which type do you want to transform?',
          choices: [...typeTransformOptions, 'all'],
        },
      ]);

      console.log('Running transform for types...');
      await executeJscodeshift({
        directory,
        transformStep: 'types',
        platform,
        typeTransformName,
        ...(typeName === 'all' ? {} : { typeName }),
      });
      break;
    }
    case 'misc': {
      console.log('Running transform for miscellaneous items...');
      const { miscTransformName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'miscTransformName',
          message: 'Which miscellaneous item do you want to transform?',
          choices: Object.keys(miscTransformMap),
        },
      ]);
      await executeJscodeshift({ directory, transformStep: 'misc', platform, miscTransformName });
      break;
    }
    case 'everything':
      console.log('Running everything transforms...');
      await executeJscodeshift({ directory, transformStep: 'everything', platform });
      break;
    default:
      console.log('\n--- Running all component transforms ---\n');
      await executeJscodeshift({
        directory,
        transformStep: 'everything',
        platform,
      });
      break;
  }
}

async function executeJscodeshift({
  directory,
  componentName,
  hookName,
  importTransformName,
  miscTransformName,
  typeTransformName,
  transformStep = 'base',
  ignorePattern,
  platform,
  typeName,
  importPath,
}: {
  directory: string;
  transformStep?: string;
  ignorePattern?: string;
  platform?: string;

  componentName?: string;
  hookName?: string;
  importTransformName?: string;
  miscTransformName?: string;
  typeTransformName?: string;
  typeName?: string;
  importPath?: string;
}) {
  const jscodeshiftArgs = [
    directory,
    '-t',
    TRANSFORM_PATH,
    '--parser=tsx',
    '--extensions=ts,tsx,js,mjs,cjs',
    '--ignore-pattern=**/.nx/cache/**',
    `--printOptions=${JSON.stringify({ reuseWhitespace: true })}`,
  ];
  if (ignorePattern) {
    jscodeshiftArgs.push(`--ignore-pattern=${ignorePattern}`);
  }

  if (transformStep) {
    jscodeshiftArgs.push(`--transform-type=${transformStep}`);
  }

  if (componentName) {
    jscodeshiftArgs.push(`--component=${componentName}`);
  }

  if (platform) {
    jscodeshiftArgs.push(`--platform=${platform}`);
  }

  if (hookName) {
    jscodeshiftArgs.push(`--hook=${hookName}`);
  }

  if (importTransformName) {
    jscodeshiftArgs.push(`--importTransform=${importTransformName}`);
  }

  if (importPath) {
    jscodeshiftArgs.push(`--importPath=${importPath}`);
  }

  if (typeTransformName) {
    jscodeshiftArgs.push(`--typeTransform=${typeTransformName}`);
  }

  if (typeName) {
    jscodeshiftArgs.push(`--typeName=${typeName}`);
  }

  if (miscTransformName) {
    jscodeshiftArgs.push(`--miscTransform=${miscTransformName}`);
  }

  return new Promise<void>((resolve) => {
    try {
      console.log(`\nExecuting: jscodeshift ${jscodeshiftArgs.join(' ')}\n`);
      execSync(`npx jscodeshift ${jscodeshiftArgs.join(' ')}`, {
        stdio: 'inherit',
      });
      console.log('\n--- Transform complete ---\n');
      resolve();
    } catch (error) {
      // jscodeshift exits with non-zero status codes on errors, but also when no files are transformed.
      // We'll resolve the promise anyway to allow the next script to run.
      console.warn(
        '\n--- jscodeshift exited with a non-zero status code. This may not be an error. ---\n',
      );
      resolve();
    }
  });
}

run();
