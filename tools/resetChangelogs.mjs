/**
 * Run with `yarn reset-changelogs` from the root package.json scripts.
 *
 * Resets the changelog files and package.json version fields to the origin master branch.
 */
import fs from 'fs';
import { spawnSync } from 'child_process';
import { globSync } from 'glob';

function updateMasterBranch() {
  try {
    const result = spawnSync('git', ['fetch', 'origin', 'master:master'], { encoding: 'utf-8' });
    if (result.error) {
      console.error(`Error updating master branch:`, result.error.message);
      process.exit(1);
    }
    if (result.stderr) {
      console.error(`Error updating master branch:`, result.stderr);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error updating master branch:`, error.message);
    process.exit(1);
  }
}

function getMasterPackageVersion(filePath) {
  try {
    const result = spawnSync('git', ['show', `master:${filePath}`], { encoding: 'utf-8' });
    if (result.error) {
      console.error(`Error fetching version from master for ${filePath}:`, result.error.message);
      process.exit(1);
    }
    if (result.stderr) {
      console.error(`Error fetching version from master for ${filePath}:`, result.stderr);
      process.exit(1);
    }
    const masterPackageJson = JSON.parse(result.stdout);
    return masterPackageJson.version;
  } catch (error) {
    console.error(`Error fetching version from master for ${filePath}:`, error.message);
    process.exit(1);
  }
}

function updateVersionInPackageJson(filePath, newVersion) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const packageJson = JSON.parse(data);
    packageJson.version = newVersion;
    const packageJsonString = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync(filePath, packageJsonString + '\n', 'utf-8');
  } catch (error) {
    console.error(`Error updating version in ${filePath}:`, error.message);
    process.exit(1);
  }
}

function gitStageFiles(filePaths) {
  try {
    const result = spawnSync('git', ['add', ...filePaths], { encoding: 'utf-8' });
    if (result.error) {
      console.error(`Error staging files:`, result.error.message);
      process.exit(1);
    }
    if (result.stderr) {
      console.error(`Error staging files:`, result.stderr);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error staging files:`, error.message);
    process.exit(1);
  }
}

function resetChangelogsToMaster() {
  try {
    const result = spawnSync(
      'git',
      ['checkout', 'origin/master', 'packages/*/CHANGELOG.md', 'apps/website/docs/changelog/*.mdx'],
      { encoding: 'utf-8' },
    );
    if (result.error) {
      console.error(`Error resetting changelogs to master:`, result.error.message);
      process.exit(1);
    }
    if (result.stderr.includes('error')) {
      console.error(`Error resetting changelogs to master:`, result.stderr);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error resetting changelogs to master:`, error.message);
    process.exit(1);
  }
}

function main() {
  try {
    console.log('Updating the master branch');
    updateMasterBranch();
    const packageJsons = globSync('packages/*/package.json');
    for (const file of packageJsons) {
      console.log('Getting version from master for', file);
      const newVersion = getMasterPackageVersion(file);
      if (newVersion) {
        console.log('Updating version for', file, 'to', newVersion);
        updateVersionInPackageJson(file, newVersion);
      }
    }
    gitStageFiles(packageJsons);
    console.log('Resetting changelogs to master');
    resetChangelogsToMaster();
    spawnSync('git', ['status'], { stdio: 'inherit' });
  } catch (error) {
    console.error('Error finding package.json files:', error.message);
  }
}

main();
