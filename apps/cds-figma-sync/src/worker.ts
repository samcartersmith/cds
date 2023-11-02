import { parentPort } from 'node:worker_threads';

import { syncAssets } from './syncAssets';

export const workerFilepath = import.meta.url;

parentPort?.on('message', async () => {
  await syncAssets();
  parentPort?.postMessage('Done');
});
