import { existsSync, rmSync } from 'node:fs';
import { createLogger, format, transports } from 'winston';

const errorLogFilename = 'error.log';
const combinedLogFilename = 'combined.log';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    // Write to all logs with level `info` and below to `combined.log`
    // Write all logs error (and below) to `error.log`
    new transports.File({ filename: errorLogFilename, level: 'error' }),
    new transports.File({ filename: combinedLogFilename }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export const resetLogs = () => {
  if (existsSync(errorLogFilename)) rmSync(errorLogFilename);
  if (existsSync(combinedLogFilename)) rmSync(combinedLogFilename);
};
