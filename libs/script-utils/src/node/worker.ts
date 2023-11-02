// https://nodejs.org/docs/latest-v18.x/api/async_context.html#using-asyncresource-for-a-worker-thread-pool
import { AsyncResource } from 'node:async_hooks';
import { EventEmitter } from 'node:events';
import type { WorkerOptions } from 'node:worker_threads';
import { Worker } from 'node:worker_threads';

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

type WorkerCallback = (error: Error | null, result: unknown) => void;

type WorkerTask = {
  task: unknown;
  callback: WorkerCallback;
};

class WorkerPoolTaskInfo extends AsyncResource {
  callback: WorkerCallback;

  constructor(callback: WorkerCallback) {
    super('WorkerPoolTaskInfo');
    this.callback = callback;
  }

  done(error: Error | null, result: unknown) {
    this.runInAsyncScope(this.callback, null, error, result);
    this.emitDestroy(); // `TaskInfo`s are used only once.
  }
}

export type WorkerWithWorkerPoolTaskInfo = Worker & { [kTaskInfo]: WorkerPoolTaskInfo | null };

/**
 * An asynchronous Worker pool to for multi-threading CPU-intensive JavaScript operations.
 * You can initialize and use the pool like so:
 * ```
 * import { WorkerPool } from '@cbhq/script-utils'
 * import os from 'node:os';
 *
 * const workerPool = new WorkerPool(
 *   os.availableParallelism(), // number of threads
 *   path.resolve('path/to/file.js'), // filepath or file URL for Worker
 *   { env: { TEST: 'hello' } } // optional Worker options
 * )
 * ```
 */
export class WorkerPool extends EventEmitter {
  numberOfThreads: number; // Number of parallel threads, normally determined with os.availableParallelism()

  filename: string | URL; // Worker filename

  workerOptions?: WorkerOptions; // Worker options

  workers: WorkerWithWorkerPoolTaskInfo[];

  freeWorkers: WorkerWithWorkerPoolTaskInfo[];

  tasks: WorkerTask[];

  constructor(numberOfThreads: number, filename: string | URL, workerOptions?: WorkerOptions) {
    super();

    this.numberOfThreads = numberOfThreads;
    this.filename = filename;
    this.workerOptions = workerOptions;

    this.workers = [];
    this.freeWorkers = [];
    this.tasks = [];

    for (let i = 0; i < numberOfThreads; i++) this.addNewWorker();

    // Any time the kWorkerFreedEvent is emitted, dispatch
    // the next task pending in the queue, if any.
    this.on(kWorkerFreedEvent, () => {
      if (this.tasks.length > 0) {
        const { task, callback } = this.tasks.shift() as WorkerTask;
        this.runTask(task, callback);
      }
    });
  }

  addNewWorker() {
    const worker = new Worker(this.filename, this.workerOptions) as WorkerWithWorkerPoolTaskInfo;

    worker.on('message', (result) => {
      // In case of success: Call the callback that was passed to `runTask`,
      // remove the `TaskInfo` associated with the Worker, and mark it as free
      // again.
      worker[kTaskInfo]?.done(null, result);
      worker[kTaskInfo] = null;
      this.freeWorkers.push(worker);
      this.emit(kWorkerFreedEvent);
    });

    worker.on('error', (err) => {
      // In case of an uncaught exception: Call the callback that was passed to
      // `runTask` with the error.
      if (worker[kTaskInfo]) worker[kTaskInfo].done(err, null);
      else this.emit('error', err);
      // Remove the worker from the list and start a new Worker to replace the
      // current one.
      this.workers.splice(this.workers.indexOf(worker), 1);
      this.addNewWorker();
    });

    this.workers.push(worker);
    this.freeWorkers.push(worker);
    this.emit(kWorkerFreedEvent);
  }

  runTask<T>(task: T, callback: WorkerCallback) {
    if (this.freeWorkers.length === 0) {
      // No free threads, wait until a worker thread becomes free.
      this.tasks.push({ task, callback });
      return;
    }

    const worker = this.freeWorkers.pop() as WorkerWithWorkerPoolTaskInfo;
    worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
    worker.postMessage(task);
  }

  close() {
    for (const worker of this.workers) void worker.terminate();
  }
}
