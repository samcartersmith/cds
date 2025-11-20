/**
 * Simple logger utility for Figma metrics collection
 * Supports verbose logging controlled by VERBOSE_LOGS environment variable
 */

/**
 * Logger interface
 */
export const logger = {
  /**
   * Always log a message to the console
   */
  log(message: string): void {
    console.log(message);
  },

  /**
   * Log a message only if VERBOSE_LOGS environment variable is set
   */
  verbose(message: string): void {
    if (process.env.VERBOSE_LOGS === '1') {
      console.log(message);
    }
  },
};
