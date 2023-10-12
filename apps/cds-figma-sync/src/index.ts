import { createServer } from 'node:http';

import { getCombinedLogs, getErrorLogs, logger, resetLargeLogs } from './logger.js';
import { syncAssets } from './syncAssets.js';

resetLargeLogs();

const HOSTNAME = '0.0.0.0';
const PORT = 3001;

let isSyncing = false;

const server = createServer((request, response) => {
  if (request.url !== '/_health')
    logger.info(`Server received request ${request.method} ${request.url}`);
  response.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  let data = '';

  if (request.url === '/sync' && isSyncing) {
    response.writeHead(503);
    response.end('Asset sync already in progress');
    return;
  }

  if (request.url === '/sync') {
    data = 'Starting asset sync';
    isSyncing = true;
    void syncAssets().finally(() => {
      isSyncing = false;
    });
  }

  if (request.url === '/logs') data = getCombinedLogs() || 'No logs';
  if (request.url === '/errors') data = getErrorLogs() || 'No errors';
  if (request.url === '/_health') data = 'ok';

  if (data) {
    response.writeHead(200);
    response.end(data);
    if (request.url !== '/_health')
      logger.info(`Server responded with 200 for valid endpoint ${request.url}`);
    return;
  }

  response.writeHead(404);
  response.end(`Invalid endpoint "${request.url}"`);
  logger.warn(`Server responded with 404 for invalid endpoint ${request.url}`);
});

server.listen(PORT, HOSTNAME, () => {
  logger.info(`Server is running on http://${HOSTNAME}:${PORT}`);
});
