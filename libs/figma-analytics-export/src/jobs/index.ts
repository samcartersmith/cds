import { logger } from '../logger';

import { illustrationUsageJob } from './illustration-usage';
import { listAllIllustrationsJob } from './list-all-illustrations';

/**
 * Available job names
 */
export type JobName = 'illustration-usage' | 'list-all-illustrations';

/**
 * Job configuration
 */
export type JobConfig = {
  name: JobName;
};

/**
 * Job options that can be passed to jobs
 */
export type JobOptions = {
  days?: number;
};

/**
 * Registry of available jobs
 */
const jobRegistry: Record<JobName, (options: JobOptions) => Promise<void>> = {
  'illustration-usage': illustrationUsageJob,
  'list-all-illustrations': listAllIllustrationsJob,
};

/**
 * Run a job by name
 * @param jobName - The name of the job to run
 * @param options - Optional configuration for the job
 */
export async function runJob(jobName: JobName, options: JobOptions = {}): Promise<void> {
  const job = jobRegistry[jobName];

  if (!job) {
    throw new Error(
      `Unknown job: ${jobName}. Available jobs: ${Object.keys(jobRegistry).join(', ')}`,
    );
  }

  logger.log(`Starting job: ${jobName}`);
  await job(options);
  logger.log(`Job completed: ${jobName}`);
}

/**
 * Get list of available job names
 */
export function getAvailableJobs(): JobName[] {
  return Object.keys(jobRegistry) as JobName[];
}
