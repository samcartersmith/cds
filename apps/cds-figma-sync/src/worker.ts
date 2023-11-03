import { parentPort } from 'node:worker_threads';

import { syncAssets } from './syncAssets';

export const workerFilepath = import.meta.url;

parentPort?.on('message', async () => {
  const message = await syncAssets();
  parentPort?.postMessage({ message });
});
