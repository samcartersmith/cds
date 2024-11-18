/* eslint-disable no-console */
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import inquirer from 'inquirer';
import { join, resolve } from 'path';

const projects = [
  'common',
  'fonts',
  'icons',
  'illustrations',
  'lottie-files',
  'mobile',
  'mobile-visualization',
  'utils',
  'web',
  'web-visualization',
];

const tarballsDir = 'tarballs';

async function selectProjects() {
  const choices = await Promise.all(
    projects.map(async (project) => {
      const packageJsonPath = join('packages', project, 'package.json');
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        return {
          name: `${project} (v${packageJson.version})`,
          value: project,
          checked: false,
        };
      } catch (error) {
        return {
          name: `${project} (version unknown)`,
          value: project,
          checked: true,
        };
      }
    }),
  );

  const { selectedProjects } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedProjects',
      message: 'Select packages to build:',
      choices,
      pageSize: 20,
    },
  ]);

  return selectedProjects;
}

async function main() {
  const selectedProjects = await selectProjects();

  if (selectedProjects.length === 0) {
    console.log('No projects selected. Exiting...');
    process.exit(0);
  }

  // Step 1: Run the typecheck and build command
  try {
    console.log('🚀 Starting typecheck and build...');
    execSync(
      `yarn nx run-many --target=typecheck,build --configuration=prod --projects=${selectedProjects.join(
        ',',
      )}`,
    );
  } catch (error) {
    console.error('❌ Error during typecheck and build:', error);
    process.exit(1);
  }

  // Step 2: Create the tarballs directory if it doesn't exist
  if (!existsSync(tarballsDir)) {
    mkdirSync(tarballsDir);
    console.log(`📁 Created tarballs directory: ${tarballsDir}`);
  }

  // Step 3: Remove all old files inside the tarballs directory
  const oldFiles = readdirSync(tarballsDir);
  oldFiles.forEach((file) => {
    const filePath = join(tarballsDir, file);
    unlinkSync(filePath);
  });

  // Step 4: Loop through each project and generate tarballs
  selectedProjects.forEach((project) => {
    try {
      const projectDir = join('packages', project);
      const packageJsonPath = join(projectDir, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      const { version } = packageJson;
      const tarballName = `${project}-${version}.tgz`;
      const tarballPath = resolve(tarballsDir, tarballName);

      process.chdir(projectDir);
      execSync(`yarn pack --filename ${tarballPath}`);
      console.log(`📦 Tarball created for ${project}`);
      process.chdir('../..');
    } catch (error) {
      console.error(`❌ Error processing project ${project}:`, error);
    }
  });

  console.log('🎉 All tarballs generated successfully.');
}

main().catch(console.error);
