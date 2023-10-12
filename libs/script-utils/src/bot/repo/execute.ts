import { logger } from './logger.js';

/**
 * Runs the handler function and logs the message and any errors.
 */
export const execute = async <T>(
  message: string,
  handler: (...args: unknown[]) => Promise<T>,
): Promise<T> => {
  try {
    const startTime = Date.now();
    logger.info(`${message} - started`);
    const result = await handler();
    const elapsedTime = (Date.now() - startTime) / 1000;
    logger.info(`${message} - finished in ${elapsedTime}s`);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
