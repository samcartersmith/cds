import { exec, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import util from 'node:util';

import { cleanup, getTempRepos, info, success } from '../podium/utils';

import { a11yLintConfig } from './config';
import { A11yLintConfig } from './types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * To run this script:
 * yarn nx run website:a11y-lint-tracker
 */

type CodeOwnersMap = {
  [owner: string]: string[];
};

type EslintMessage = {
  ruleId: string | null;
  severity: number;
  message: string;
  line?: number;
  column?: number;
};

type EslintResult = {
  filePath: string;
  messages: EslintMessage[];
};

type EslintOutput = EslintResult[];

type RepoType = 'web' | 'mobile' | 'both';

const execPromise = util.promisify(exec);
const repos = a11yLintConfig.map((item) => item.repo);
const rootDir = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const tempEslintConfigPathBoth = path.join(__dirname, 'temp-eslintrc.js');

const filterRulePrefixes: Record<RepoType, string[]> = {
  web: ['jsx-a11y', '@cbhq/cds/control-has-associated-label-extended'],
  mobile: ['@cbhq/cds/has-valid-accessibility-descriptors-extended', 'react-native-a11y'],
  both: [
    'jsx-a11y',
    '@cbhq/cds/control-has-associated-label-extended',
    '@cbhq/cds/has-valid-accessibility-descriptors-extended',
    'react-native-a11y',
  ],
};

async function runSetupCommands(config: A11yLintConfig, repoPath: string) {
  // Run custom setup commands or default to 'yarn' if none are specified
  if (config.customSetupCommands && config.customSetupCommands.length > 0) {
    for (const command of config.customSetupCommands) {
      // eslint-disable-next-line no-await-in-loop
      await execPromise(command, { cwd: repoPath });
      info(`Executed custom setup command: ${command} for ${repoPath}`);
    }
  } else {
    await execPromise('yarn add @cbhq/eslint-plugin-cds --dev && yarn', { cwd: repoPath });

    info(`Dependencies installed for ${repoPath}`);
  }
}

async function runESLintOnTarget(projectPath: string, outputFilePath: string, repoType: RepoType) {
  // Run eslint on target project
  const eslintProcess = spawn(
    'npx',
    ['eslint', '.', '--format', 'json', '--resolve-plugins-relative-to', projectPath],
    { cwd: projectPath },
  );

  info(`ESLint process spawn reached for ${projectPath}`);

  let rawData = '';
  eslintProcess.stdout.on('data', (data) => {
    rawData += data;
    // info(`ESLint output: ${data}`); // Log output for debugging
  });
  eslintProcess.stderr.on('data', (data) => {
    console.error(`ESLint error: ${data}`);
  });

  return new Promise<void>((resolve, reject) => {
    eslintProcess.on('close', (code) => {
      info(`ESLint process completed for ${projectPath} with code ${code}`); // Confirm completion

      if (code === 0 || code === 1) {
        // Treat both code 0 and 1 as valid for processing
        const results: EslintOutput = JSON.parse(rawData);

        const filteredResults = results
          .map((file) => ({
            ...file,
            messages: file.messages.filter((message) =>
              filterRulePrefixes[repoType].some((rule) => message.ruleId?.startsWith(rule)),
            ),
          }))
          .filter((file) => file.messages.length > 0);

        const dir = path.dirname(outputFilePath);
        fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(outputFilePath, JSON.stringify(filteredResults, null, 2));
        success(`Filtered ESLint output saved for ${projectPath}`);

        resolve();
      } else {
        reject(new Error(`ESLint process exited with non-success code ${code}`));
      }
    });
  });
}

function replaceESLintConfig(projectPath: string) {
  info(`Replacing eslintrc file ${projectPath}`);
  const originalEslintConfigPath = path.join(projectPath, '.eslintrc.js');

  fs.copyFileSync(tempEslintConfigPathBoth, originalEslintConfigPath);

  info(`Replacing eslintrc file success for ${projectPath}`);
}

// Function to merge JSON output files
async function mergeJSONOutputs(sourceDir: string, outputFile: string) {
  try {
    const files = await fs.promises.readdir(sourceDir);
    const jsonFiles = files.filter(
      (file) =>
        file.endsWith('.json') &&
        !file.includes('--fullRepo') &&
        !file.includes('disabled') &&
        !file.includes('-codeowners') &&
        !file.includes('a11yLintRepos'),
    );

    const readPromises = jsonFiles.map(async (file) => {
      const filePath = path.join(sourceDir, file);
      return fs.promises
        .readFile(filePath, 'utf-8')
        .then((data) => JSON.parse(data) as EslintOutput);
    });

    const allResults = await Promise.all(readPromises);

    // Flatten the array of arrays into a single array
    const flattenedResults = allResults.flat();

    await fs.promises.writeFile(outputFile, JSON.stringify(flattenedResults, null, 2), 'utf-8');
    info(`Merged output saved to ${outputFile}`);
  } catch (error) {
    console.error(`Error merging JSON outputs`);
  }
}

function parseCodeOwners(
  repoPath: string,
  outputDir: string,
  repoNameKebab: string,
  config: A11yLintConfig,
) {
  const codeOwnersPath = path.join(repoPath, config.codeownersUrl || 'CODEOWNERS');
  try {
    const codeOwnersContent = fs.readFileSync(codeOwnersPath, 'utf-8');
    const lines = codeOwnersContent.split('\n');
    const codeOwnersMap: CodeOwnersMap = {};

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        // Ignore comments and empty lines
        // Split the line into parts and assume last part is the owner, rest are path(s)
        const parts = trimmedLine.split(/\s+/);
        const owner = parts.pop(); // Last element is assumed to be the owner
        if (owner) {
          const path = parts.join(' ').trim(); // Join the rest back to form the complete path
          if (codeOwnersMap[owner]) {
            codeOwnersMap[owner].push(path);
          } else {
            codeOwnersMap[owner] = [path];
          }
        }
      }
    });

    const outputPath = path.join(outputDir, `${repoNameKebab}/${repoNameKebab}-codeowners.json`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(codeOwnersMap, null, 2), 'utf-8');
    console.log(`Codeowners parsed and saved for ${repoNameKebab}`);
  } catch (error) {
    console.error(`Error reading or parsing CODEOWNERS file for ${repoNameKebab}:`, error);
  }
}

// Run ESLint and save output
async function runEslintAndSaveOutput(
  repoPath: string,
  outputDir: string,
  repoNameKebab: string,
  config: A11yLintConfig,
) {
  try {
    // Complex repos are repos where we need to lint per project
    if (config.repoType === 'complex' && config.targetProjects) {
      // Install deps
      const workSpaceDirPath = path.join(repoPath, config.workspaceDir || '');
      info(`Running yarn for workspace: ${workSpaceDirPath}`);
      await runSetupCommands(config, workSpaceDirPath);

      // Process individual target projects
      const projectPromises = config.targetProjects.map(async (project) => {
        const projectPath = path.join(workSpaceDirPath, project.projectPath);

        // Replace eslintrc file in project dir
        info(`Starting ESLint process for ${projectPath}`);
        replaceESLintConfig(projectPath);

        const outputFilePath = path.join(outputDir, repoNameKebab, `${project.name}.json`);
        return runESLintOnTarget(projectPath, outputFilePath, project.repoType);
      });
      // Wait for all projects to complete their ESLint checks
      await Promise.all(projectPromises);

      // Merge all project outputs together
      const mergedOutputPath = path.join(
        outputDir,
        `${repoNameKebab}/${repoNameKebab}-fullRepo.json`,
      );
      await mergeJSONOutputs(path.join(outputDir, repoNameKebab), mergedOutputPath);
    }
    // Standard repos where we lint entire repo from root eslintrc file
    else {
      const outputFilePath = path.join(
        outputDir,
        `${repoNameKebab}/${repoNameKebab}-fullRepo.json`,
      );
      replaceESLintConfig(repoPath);
      await runSetupCommands(config, repoPath);

      // Log before starting ESLint process
      info(`Starting ESLint process for ${repoPath}`);

      if (config.repoType !== 'complex') {
        await runESLintOnTarget(repoPath, outputFilePath, config.repoType);
      } else {
        info(
          `Skipping ESLint process for ${repoPath} as it is a complex repo and is missing target projects`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to run ESLint for ${repoPath}:`, error);
  }
}

// Run ESLint Disable and save output
async function runEslintDisablesAndSaveOutput(
  repoPath: string,
  outputDir: string,
  repoNameKebab: string,
) {
  const dirPath = `${outputDir}/${repoNameKebab}`;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const grepCommand = `grep -rnE --exclude-dir=node_modules --include=\\*.js --include=\\*.jsx --include=\\*.ts --include=\\*.tsx 'eslint-disable(-next-line|-line)?(:\\s*|(.*))(jsx-a11y/|@cbhq/cds/|react-native-a11y/)' . > ${outputDir}/${repoNameKebab}/disabled-a11y-rules.txt`;

  try {
    await execPromise(grepCommand, { cwd: repoPath });

    // Read the grep output from the text file
    const grepOutput = fs.readFileSync(
      `${outputDir}/${repoNameKebab}/disabled-a11y-rules.txt`,
      'utf-8',
    );

    // Process the grep output and format it to JSON
    const jsonOutput = grepOutput
      .split('\n')
      .filter((line) => line)
      .map((line) => {
        const [filePath, lineNumber, ...rest] = line.split(':');
        const ruleDetails = rest.join(':').trim();
        const ruleMatch = ruleDetails.match(/eslint-disable(-next-line|-line)?(:\s*|(.*))/);
        const rule = ruleMatch ? ruleMatch[0] : ruleDetails;

        return { filePath, lineNumber: parseInt(lineNumber, 10), rule };
      });

    fs.writeFileSync(
      `${outputDir}/${repoNameKebab}/disabled-a11y-rules.json`,
      JSON.stringify(jsonOutput, null, 2),
    );
    console.log(`Successfully saved ESLint disable output for ${repoNameKebab}`);
  } catch (error) {
    console.error(`Failed to run ESLint disable for ${repoNameKebab}:`, error);
  }
}

async function processRepos(outputDir: string, tempDir: string) {
  const repoPromises = a11yLintConfig.map(async (config) => {
    const { repo } = config;
    // make the repo name kebab case, no slashes
    const repoNameKebab = repo.replace(/\//g, '-');
    const repoDirectory = `${tempDir}/${repo}`;
    parseCodeOwners(repoDirectory, outputDir, repoNameKebab, config);

    await runEslintAndSaveOutput(repoDirectory, outputDir, repoNameKebab, config);
    await runEslintDisablesAndSaveOutput(repoDirectory, outputDir, repoNameKebab);
  });
  await Promise.all(repoPromises);
}

export async function generateLintRepos(
  outputDir: string,
  config: A11yLintConfig[],
): Promise<{ success: boolean }> {
  try {
    if (!outputDir) {
      throw new Error('Please provide a valid output directory');
    }

    const reposWithIds = config.map((repoConfig) => {
      const repoNameKebab = repoConfig.repo.replace(/\//g, '-');
      return { id: repoNameKebab, ...repoConfig };
    });

    const fileContent = `/**
* DO NOT MODIFY
* Generated from yarn nx run website:a11y-lint-tracker
*/
export const a11yLintRepos = ${JSON.stringify(reposWithIds, null, 2)};
`;

    await fs.promises.mkdir(outputDir, { recursive: true });
    const filePath = path.join(outputDir, 'a11yLintRepos.ts');
    await fs.promises.writeFile(filePath, fileContent, 'utf-8');

    console.log(`Successfully generated lint repos file at ${filePath}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to generate lint repos:', error);
    return { success: false };
  }
}

export default async function getA11yLintData(): Promise<{ success: boolean }> {
  try {
    if (!rootDir) {
      throw new Error('Please provide a valid root directory');
    }

    const outputDir = path.join(rootDir, 'apps/website/static/data/__generated__/a11yLintConfig');

    // Clean up outputDir to start fresh
    cleanup(outputDir);
    const a11yConfigOutputDir = path.join(
      rootDir,
      'apps/website/data/__generated__/a11yLintConfig',
    );

    const tempDir = path.join(rootDir, '.a11yLintConfig/repos');

    await getTempRepos(repos, tempDir);
    info('Cloned all repos');

    await processRepos(outputDir, tempDir);
    await generateLintRepos(a11yConfigOutputDir, a11yLintConfig);

    cleanup(tempDir);
    return { success: true };
  } catch (error) {
    console.error('Failed to execute:', error);
    return { success: false };
  }
}

void getA11yLintData();
