import { exec as execCallback, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const exec = promisify(execCallback);

const __filename = fileURLToPath(import.meta.url);
let projectRoot = path.dirname(__filename);
// traverse directories up until we reach the 'cds' directory which is the monorepo root
while (path.basename(projectRoot) !== 'cds' && projectRoot !== path.dirname(projectRoot)) {
  projectRoot = path.dirname(projectRoot);
}

const pathToSrcCli = path.join(projectRoot, 'node_modules/.bin/src');

/**
 * Execute a src-cli command and return the output
 */
export async function executeSrcCommand(command: string, args: string[] = []): Promise<string> {
  // Check if src-cli is available in root node_modules
  await exec(`${pathToSrcCli} version`);

  return new Promise((resolve, reject) => {
    // Sourcegraph API key from env
    const SRC_ACCESS_TOKEN = process.env.SRC_ACCESS_TOKEN;
    // Sourcegraph endpoint from env
    const SRC_ENDPOINT = process.env.SRC_ENDPOINT;

    // Create environment for the command with API key
    const env = {
      ...process.env,
      SRC_ACCESS_TOKEN,
      SRC_ENDPOINT,
    };

    // Construct the full command array
    const fullCommand = [command, ...args];

    // For debugging
    console.error(`Executing: src ${fullCommand.join(' ')}`);

    // Spawn the src-cli process using the root node_modules path
    const srcProcess = spawn(pathToSrcCli, fullCommand, {
      env,
    });

    let stdout = '';
    let stderr = '';

    srcProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    srcProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    srcProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`src-cli command failed with code ${code}: ${stderr}`));
      }
    });

    srcProcess.on('error', (error) => {
      reject(new Error(`Failed to execute src-cli: ${error.message}`));
    });
  });
}

/**
 * Test Sourcegraph connection and return version information
 */
export async function testConnection(): Promise<string> {
  return executeSrcCommand('version');
}
