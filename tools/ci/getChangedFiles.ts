import { execSync } from 'node:child_process';
import { logInfo as logInfoBase } from './logging';
import { printFileList } from './findFiles';
import { getBase } from './getBase';

export async function getChangedFiles(verbose = true, logInfo = logInfoBase): Promise<string[]> {
  if (verbose) {
    logInfo('Loading changed files:');
  }

  const base = getBase();
  let mergeBase = base;

  try {
    mergeBase = execSync(`git merge-base ${base} HEAD`).toString().trim();
  } catch {
    mergeBase = execSync(`git merge-base --fork-point ${base} HEAD`).toString().trim();
  }

  const files = execSync(`git --no-pager diff --name-only --relative ${mergeBase}`)
    .toString()
    .trim()
    .split('\n');

  if (verbose) {
    printFileList(files, logInfo);
  }

  return files;
}
