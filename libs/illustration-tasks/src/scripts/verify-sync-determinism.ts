#!/usr/bin/env tsx

import { execSync } from 'node:child_process';
import * as path from 'node:path';

// ANSI colors
const colors = {
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
  reset: '\x1b[0m',
};

function log(level: 'info' | 'success' | 'error' | 'warning', message: string) {
  const colorMap = {
    info: colors.blue,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
  };
  const label = level.toUpperCase();
  console.log(`${colorMap[level]}[${label}]${colors.reset} ${message}`);
}

function exec(command: string, cwd: string, maxBuffer = 1024 * 1024 * 10): string {
  return execSync(command, { cwd, encoding: 'utf-8', maxBuffer }).trim();
}

// Resolve paths
const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? process.cwd();
const CDS_OSS_ROOT = path.resolve(MONOREPO_ROOT, '../temp-oss-cds');

// Validate temp-oss-cds exists
if (!require('fs').existsSync(path.join(CDS_OSS_ROOT, '.git'))) {
  log('error', `temp-oss-cds repository not found at ${CDS_OSS_ROOT}`);
  process.exit(1);
}

// Get current branch in cds repo
const originalCdsBranch = exec('git branch --show-current', MONOREPO_ROOT);

// Validate temp-oss-cds is clean and on master
log('info', 'Validating temp-oss-cds repository state...');
const currentBranch = exec('git branch --show-current', CDS_OSS_ROOT);
if (currentBranch !== 'master') {
  log('error', `temp-oss-cds is not on master branch (currently on: ${currentBranch})`);
  process.exit(1);
}

const gitStatus = exec('git status --short', CDS_OSS_ROOT);
if (gitStatus.length > 0) {
  log('error', 'temp-oss-cds repository is not clean');
  console.log(exec('git status', CDS_OSS_ROOT));
  process.exit(1);
}

log('info', 'Pulling latest master in temp-oss-cds...');
exec('git pull origin master', CDS_OSS_ROOT);

// Generate branch names
const today = new Date().toISOString().slice(0, 10);
const branchName = `illustrations/${today}`;
const tempBranchName = `temp-${branchName}`;

log('info', `Branch names for today: ${branchName}\n`);

// Track state for cleanup
let tempBranchCreated = false;
let newBranchCreated = false;
let comparisonResult: 'success' | 'failure' | 'error' = 'error';
const differences: FileDifference[] = [];

interface FileDifference {
  file: string;
  type: 'content' | 'hash';
  details: string;
}

try {
  // Run first sync
  log('info', '=== STEP 1: Running first sync-illustrations ===');
  exec('yarn nx run illustration-tasks:sync-illustrations', MONOREPO_ROOT);

  // Rename and push temp branch
  log('info', '=== STEP 2-3: Renaming branch and cleaning up ===');
  log('info', `Renaming ${branchName} to ${tempBranchName}...`);
  exec(`git branch -m ${branchName} ${tempBranchName}`, CDS_OSS_ROOT);
  tempBranchCreated = true;
  log('info', 'Pushing temp branch to remote...');
  exec(`git push origin ${tempBranchName}`, CDS_OSS_ROOT);
  log('info', 'Deleting original branch from remote...');
  try {
    exec(`git push origin --delete ${branchName}`, CDS_OSS_ROOT);
  } catch {
    log('warning', `Branch ${branchName} may not exist on remote`);
  }

  // Checkout master
  log('info', '=== STEP 4: Checking out master in temp-oss-cds ===');
  exec('git checkout master', CDS_OSS_ROOT);

  // Switch cds repo to master
  log('info', '=== STEP 5-6: Switching to master in cds repo ===');
  exec('git checkout master', MONOREPO_ROOT);

  // Run second sync
  log('info', '=== STEP 7: Running second sync-illustrations ===');
  exec('yarn nx run illustration-tasks:sync-illustrations', MONOREPO_ROOT);
  newBranchCreated = true;

  // Compare files
  log('info', '=== STEP 8: Comparing file contents ===');
  log('info', `Comparing ${tempBranchName} vs ${branchName}...\n`);

  // Get list of files that changed in each branch (relative to master)
  const filesInTemp = new Set(
    exec(`git diff --name-only master ${tempBranchName}`, CDS_OSS_ROOT).split('\n').filter(Boolean),
  );
  const filesInNew = new Set(
    exec(`git diff --name-only master ${branchName}`, CDS_OSS_ROOT).split('\n').filter(Boolean),
  );

  // Ensure both branches modified the same files
  const allFiles = new Set([...filesInTemp, ...filesInNew]);
  const onlyInTemp = [...filesInTemp].filter((f) => !filesInNew.has(f));
  const onlyInNew = [...filesInNew].filter((f) => !filesInTemp.has(f));

  if (onlyInTemp.length > 0 || onlyInNew.length > 0) {
    log('error', 'Different files were modified in each sync run!');
    if (onlyInTemp.length > 0) {
      console.log(`\nOnly in ${tempBranchName}:`);
      onlyInTemp.forEach((f) => console.log(`  - ${f}`));
    }
    if (onlyInNew.length > 0) {
      console.log(`\nOnly in ${branchName}:`);
      onlyInNew.forEach((f) => console.log(`  - ${f}`));
    }
    throw new Error('Different files modified in each sync');
  }

  log('info', `Comparing ${allFiles.size} files...\n`);

  // Binary file extensions
  const binaryExtensions = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.ico',
    '.woff',
    '.woff2',
    '.ttf',
    '.otf',
    '.eot',
  ]);

  let fileIndex = 0;
  for (const file of allFiles) {
    fileIndex++;
    const ext = path.extname(file).toLowerCase();
    const isBinary = binaryExtensions.has(ext);
    const fileType = isBinary ? 'binary' : 'text';

    console.log(`[${fileIndex}/${allFiles.size}] Comparing ${file} (${fileType})...`);

    if (isBinary) {
      // Compare file hashes (use 50MB buffer for large files)
      const hash1 = exec(
        `git show ${tempBranchName}:${file} | shasum -a 256`,
        CDS_OSS_ROOT,
        50 * 1024 * 1024,
      ).split(' ')[0];
      const hash2 = exec(
        `git show ${branchName}:${file} | shasum -a 256`,
        CDS_OSS_ROOT,
        50 * 1024 * 1024,
      ).split(' ')[0];

      if (hash1 !== hash2) {
        console.log(`  ${colors.red}✗ DIFFERENT${colors.reset} - Hash mismatch`);
        console.log(`    ${tempBranchName}: ${hash1}`);
        console.log(`    ${branchName}: ${hash2}\n`);
        differences.push({
          file,
          type: 'hash',
          details: `Hash mismatch:\n  ${tempBranchName}: ${hash1}\n  ${branchName}: ${hash2}`,
        });
      } else {
        console.log(`  ${colors.green}✓ IDENTICAL${colors.reset} - Hashes match`);
        console.log(`    SHA-256: ${hash1}\n`);
      }
    } else {
      // Compare text content line by line (use 50MB buffer for large files)
      let content1 = exec(`git show ${tempBranchName}:${file}`, CDS_OSS_ROOT, 50 * 1024 * 1024);
      let content2 = exec(`git show ${branchName}:${file}`, CDS_OSS_ROOT, 50 * 1024 * 1024);

      const originalSize1 = content1.length;

      // Special handling for manifest.json - filter out lastUpdated
      const isManifest = file.endsWith('manifest.json');
      if (isManifest) {
        content1 = content1
          .split('\n')
          .filter((line) => !line.includes('"lastUpdated":'))
          .join('\n');
        content2 = content2
          .split('\n')
          .filter((line) => !line.includes('"lastUpdated":'))
          .join('\n');
      }

      if (content1 !== content2) {
        console.log(`  ${colors.red}✗ DIFFERENT${colors.reset} - Content differs`);

        // Generate a mini diff
        const lines1 = content1.split('\n');
        const lines2 = content2.split('\n');
        const maxLines = Math.max(lines1.length, lines2.length);

        const diffLines: string[] = [];
        let diffCount = 0;
        for (let i = 0; i < maxLines; i++) {
          if (lines1[i] !== lines2[i]) {
            diffCount++;
            if (diffLines.length < 20) {
              diffLines.push(`    Line ${i + 1}:`);
              diffLines.push(`      - ${lines1[i] ?? '(missing)'}`);
              diffLines.push(`      + ${lines2[i] ?? '(missing)'}`);
            }
          }
        }

        console.log(`    Found ${diffCount} differing line(s)`);
        if (diffLines.length > 0) {
          console.log(`    First few differences:`);
          console.log(diffLines.slice(0, 9).join('\n'));
          if (diffCount > 3) {
            console.log(`    ... and ${diffCount - 3} more difference(s)`);
          }
        }
        console.log('');

        differences.push({
          file,
          type: 'content',
          details:
            diffLines.length > 0
              ? diffLines.join('\n')
              : 'Content differs (run git diff for details)',
        });
      } else {
        console.log(`  ${colors.green}✓ IDENTICAL${colors.reset} - Content matches`);
        console.log(
          `    Size: ${originalSize1.toLocaleString()} bytes, ${content1.split('\n').length} lines`,
        );
        if (isManifest) {
          console.log(`    ${colors.yellow}Note:${colors.reset} Ignored lastUpdated timestamp`);
        }
        console.log('');
      }
    }
  }

  console.log(''); // Extra line before summary

  // Set result based on differences
  comparisonResult = differences.length === 0 ? 'success' : 'failure';
} catch (error) {
  log('error', `Script failed: ${error instanceof Error ? error.message : String(error)}`);
  comparisonResult = 'error';
} finally {
  // Cleanup branches - always runs even on failure
  log('info', '\n=== CLEANUP: Removing temporary branches ===');

  // Ensure we're on master in temp-oss-cds
  try {
    exec('git checkout master', CDS_OSS_ROOT);
  } catch {
    log('warning', 'Failed to checkout master in temp-oss-cds');
  }

  // Delete temp branch if it was created
  if (tempBranchCreated) {
    log('info', 'Deleting temp branch from remote...');
    try {
      exec(`git push origin --delete ${tempBranchName}`, CDS_OSS_ROOT);
    } catch {
      log('warning', `Failed to delete ${tempBranchName} from remote`);
    }

    log('info', 'Deleting temp branch locally...');
    try {
      exec(`git branch -D ${tempBranchName}`, CDS_OSS_ROOT);
    } catch {
      log('warning', `Failed to delete ${tempBranchName} locally`);
    }
  }

  // Delete new branch if it was created
  if (newBranchCreated) {
    log('info', 'Deleting new branch from remote...');
    try {
      exec(`git push origin --delete ${branchName}`, CDS_OSS_ROOT);
    } catch {
      log('warning', `Failed to delete ${branchName} from remote`);
    }

    log('info', 'Deleting new branch locally...');
    try {
      exec(`git branch -D ${branchName}`, CDS_OSS_ROOT);
    } catch {
      log('warning', `Failed to delete ${branchName} locally`);
    }
  }

  // Restore original state
  log('info', '=== RESTORING ORIGINAL STATE ===');
  log('info', `Returning cds repo to original branch: ${originalCdsBranch}`);
  try {
    exec(`git checkout ${originalCdsBranch}`, MONOREPO_ROOT);
  } catch {
    log('warning', `Failed to checkout ${originalCdsBranch} in cds repo`);
  }
  log('info', 'temp-oss-cds is on master and clean\n');
}

// Final report
console.log('=============================================');
if (comparisonResult === 'success') {
  log('success', 'VERIFICATION COMPLETE: Sync is deterministic ✓');
  console.log('(Timestamps in manifest.json were ignored as expected)');
  console.log('=============================================');
  process.exit(0);
} else if (comparisonResult === 'failure') {
  log('error', 'VERIFICATION COMPLETE: Sync is NOT deterministic ✗');
  console.log('=============================================\n');
  console.log(`Found ${differences.length} file(s) with differences:\n`);

  differences.forEach((diff) => {
    console.log(`${colors.yellow}${diff.file}${colors.reset} (${diff.type} difference):`);
    console.log(diff.details);
    console.log('');
  });

  console.log('To investigate further:');
  console.log(`  cd ${CDS_OSS_ROOT}`);
  if (tempBranchCreated && newBranchCreated) {
    console.log(`  git diff ${tempBranchName} ${branchName}`);
  }

  process.exit(1);
} else {
  log('error', 'VERIFICATION FAILED: Script encountered an error');
  console.log('=============================================');
  console.log('Cleanup was performed, but comparison did not complete.');
  process.exit(1);
}
