import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { logError as logErrorBase } from './logging';
import type { ProjectGraph } from '@nx/devkit';

/**
 * Get the Nx graph
 * Nx forces you to use .json or .html in the file name, so we can't just pipe the output to stdout
 */
export async function getNxGraph(
  log: {
    logError: typeof logErrorBase;
  } = { logError: logErrorBase },
) {
  return new Promise<ProjectGraph>((resolve, reject) => {
    const tmpDir = process.env.RUNNER_TEMP ?? os.tmpdir();

    const fileName = path.join(tmpDir, `temp-nxgraph-${Math.random()}.json`);
    const yarnProcess = spawn('yarn', ['nx', 'graph', `--file=${fileName}`]);

    const endWithError = (error: string) => {
      log.logError(`Error in getNxGraph: ${error}`);
      reject(error);
      process.exit(1);
    };

    yarnProcess.stderr.on('data', (data: string) => {
      endWithError(data);
    });

    // On process close, log the accumulated output
    yarnProcess.on('close', (code: number) => {
      if (code !== 0) {
        endWithError(`getNxGraph child process exited with code ${code}`);
      }
      const graphJSON = JSON.parse(fs.readFileSync(fileName, 'utf8').toString());
      resolve(graphJSON.graph as ProjectGraph);
    });
  });
}
