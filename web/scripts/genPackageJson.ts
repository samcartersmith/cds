import * as chalk from 'chalk';
import * as fs from 'fs';
import { argv } from 'yargs';

import { writePrettyFile } from './writePrettyFile';

const deps: string = argv.deps as string;
const peerDeps: string = argv.peerDeps as string;

const rootFile: string = argv.rootFile as string;
if (!rootFile) throw new Error('No rootFile specified for package.json generation');

const baseFile: string = argv.baseFile as string;
if (!baseFile) throw new Error('No baseFile specified for package.json generation');

const outFile: string = argv.outputFile as string;
if (!outFile) throw new Error('No outputFile specified for package.json generation');

const prettierConfig: string = argv.prettierConfig as string;

const sanitizeDependencyName = (dep: string) => {
  return dep.replace('@npm//', '');
};

const packageJson = async () => {
  const depsList: {
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
  } = { dependencies: {}, peerDependencies: {} };

  // Get base file, i.e. 'basepackage.json'
  const fileContent = fs.readFileSync(baseFile).toString();

  // Parse fileContent
  let fileContentObj = JSON.parse(fileContent);

  const rootFileContent = fs.readFileSync(rootFile).toString();
  const { dependencies } = JSON.parse(rootFileContent);

  // Generate 'dependencies'
  deps.split(',').forEach(dep => {
    const name = sanitizeDependencyName(dep);
    depsList.dependencies[name] = dependencies[name];
  });

  // Generate 'peerDependencies'
  peerDeps.split(',').forEach(dep => {
    const name = sanitizeDependencyName(dep);
    depsList.peerDependencies[name] = dependencies[name];
  });

  // Add dependencies to object from template file
  fileContentObj = {
    ...fileContentObj,
    ...depsList,
  };

  // Write 'package.json' file
  await writePrettyFile({
    prettierConfig,
    outFile,
    contents: JSON.stringify(fileContentObj),
    parser: 'json',
  });
};

async function run() {
  try {
    await packageJson();

    process.exit(0);
  } catch (error) {
    console.error(`${chalk.redBright('failed')} Couldn't generate package.json.`);
    console.error(error);
    process.exit(1);
  }
}

run();
