import { uniq } from 'lodash';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import { promisify } from 'node:util';

import { adopters, adoptionDocsDir, tempDir } from '../config';

const sh = promisify(exec);
const repos = uniq(adopters.map((item) => item.github));

export async function getTempRepos() {
  try {
    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    fs.mkdirSync(adoptionDocsDir, { recursive: true });
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
