import { createServer } from 'node:http';
import { bot, WorkerPool } from '@cbhq/script-utils';

import { workerFilepath } from './worker.js';

bot.resetLargeLogs();

const HOSTNAME = '0.0.0.0';
const PORT = 3001;

const STATUS = {
  WAITING: 'Ready and waiting for a command',
  WORKING: 'Adoption stats update in progress',
  FINISHED: (message: string) => message,
  ERROR: (error?: Error | string) => (error ? `Error: ${error}` : 'Error'),
};

let running = false;
let status = STATUS.WAITING;

const workerPool = new WorkerPool<undefined, { message: string }>(1, new URL(workerFilepath));

process.on('exit', workerPool.close);

const server = createServer((request, response) => {
  if (request.url !== '/_health')
    bot.logger.info(`Server received request ${request.method} ${request.url}`);
  response.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  let data = '';

  if (request.url === '/sync' && running) {
    response.writeHead(503);
    response.end('Adoption stats update already in progress');
    return;
  }

  if (request.url === '/sync') {
    running = true;
    status = STATUS.WORKING;
    data = 'Starting adoption stats update';

    workerPool.runTask(undefined, (error, result) => {
      running = false;
      if (error || !result) {
        status = STATUS.ERROR(error || 'WorkerPool task result missing');
        bot.logger.error('WorkerPool task failed', error);
      } else {
        status = STATUS.FINISHED(result.message);
        bot.logger.info(`WorkerPool task completed successfully: ${result}`);
      }
    });
  }

  if (request.url === '/status') data = status;
  if (request.url === '/reset-status') {
    status = STATUS.WAITING;
    data = 'Status successfully reset';
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
