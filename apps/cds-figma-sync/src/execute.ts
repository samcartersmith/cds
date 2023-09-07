import { logger } from './logger.js';

/**
 * Runs the handler function and logs the message and any errors.
 */
export const execute = async <T>(
  message: string,
  handler: (...args: unknown[]) => Promise<T>,
): Promise<T> => {
  try {
    logger.info(message);
    return await handler();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
