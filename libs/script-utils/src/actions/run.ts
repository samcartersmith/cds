import { spawnSync } from 'child_process';

const BUFFER_SIZE = 1024 * 1024 * 10;

export function run(command: string, stdio: 'pipe'): string;
export function run(command: string, stdio?: 'ignore'): void;
export function run(command: string, stdio: 'ignore' | 'pipe' = 'pipe') {
  const result = spawnSync(command, {
    stdio,
    shell: true,
    maxBuffer: BUFFER_SIZE,
    encoding: 'utf-8',
  });

  if (stdio === 'ignore') {
    return;
  }

  if (result.status !== 0) {
    throw new Error(
      `Error running command (exit code ${result.status}): ${command}\n${
        result.stderr.toString().trim() || result.stdout.toString()
      }`,
    );
  }

  // The shell adds a trailing newline
  return result.stdout.replace(/\n$/, '');
}
