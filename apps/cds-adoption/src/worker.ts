import { parentPort } from 'node:worker_threads';

import { updateAdoptionStats } from './updateAdoptionStats';

export const workerFilepath = import.meta.url;

parentPort?.on('message', async () => {
  const message = await updateAdoptionStats();
  parentPort?.postMessage({ message });
});
