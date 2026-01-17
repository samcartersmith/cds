/**
 * Simple logger utility for Figma analytics export
 * Supports verbose logging controlled by VERBOSE_LOGS environment variable
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

  /**
   * Log an error message to the console
   */
  error(message: string): void {
    console.error(message);
  },
};
