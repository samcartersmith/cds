import { createServer } from 'node:http';
import { bot, WorkerPool } from '@cbhq/script-utils';

import { workerFilepath } from './worker.js';

bot.resetLargeLogs();

const HOSTNAME = '0.0.0.0';
const PORT = 3001;

let running = false;

const workerPool = new WorkerPool(1, new URL(workerFilepath));

process.on('exit', workerPool.close);

const server = createServer((request, response) => {
  if (request.url !== '/_health')
    bot.logger.info(`Server received request ${request.method} ${request.url}`);
  response.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  let data = '';

  if (request.url === '/sync' && running) {
    response.writeHead(503);
    response.end('Asset sync already in progress');
    return;
  }

  if (request.url === '/sync') {
    data = 'Starting asset sync';
    running = true;

    workerPool.runTask(undefined, (error, result) => {
      if (error) bot.logger.error('WorkerPool task failed', error);
      else bot.logger.info('WorkerPool task completed successfully', result);
      running = false;
    });
  }

  if (request.url === '/logs') data = bot.getCombinedLogs() || 'No logs';
  if (request.url === '/errors') data = bot.getErrorLogs() || 'No errors';
  if (request.url === '/_health') data = 'ok';

  if (data) {
    response.writeHead(200);
    response.end(data);
    if (request.url !== '/_health')
      bot.logger.info(`Server responded with 200 for valid endpoint ${request.url}`);
    return;
  }

  response.writeHead(404);
  response.end(`Invalid endpoint "${request.url}"`);
  bot.logger.warn(`Server responded with 404 for invalid endpoint ${request.url}`);
});

server.listen(PORT, HOSTNAME, () => {
  bot.logger.info(`Server is running on http://${HOSTNAME}:${PORT}`);
});
