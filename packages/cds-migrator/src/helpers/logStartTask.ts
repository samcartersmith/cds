import { logger, output } from '@nrwl/devkit';

export function logStartTask(str: string) {
  logger.info(output.applyNxPrefix('cyan', `${str}\n`));
}
