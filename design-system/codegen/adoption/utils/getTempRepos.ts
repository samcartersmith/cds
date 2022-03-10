import { exec } from 'child_process';
import { argv } from 'yargs';
import fs from 'fs';
import { uniq } from 'lodash';
import { promisify } from 'util';
import { adopters } from '../config';

const sh = promisify(exec);
const repos = uniq(adopters.map((item) => item.github));

const { tempDir } = argv as Record<string, string>;

export async function getTempRepos() {
  try {
    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    await Promise.all(
      repos.map(async (repo) =>
        sh(
          `git clone --depth=1 --branch=master git@github.cbhq.net:${repo} ./${repo} && rm -rf ./${repo}/.git`,
          { cwd: tempDir },
        ),
      ),
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(err?.message);
    } else {
      throw err;
    }
  }
}

export function cleanup() {
  // Delete temp directory
  exec(`rm -rf ${tempDir}`, (error) => {
    if (error) {
      console.log(error?.message);
    }
  });
}
