import { existsSync, readFileSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { createLogger, format, transports } from 'winston';

import { ROOT_WORKING_DIRECTORY } from './workingDirectory.js';

const MEGABYTE = 1024 * 1024;
const MAX_LOG_SIZE = 2 * MEGABYTE;
const MAX_LOG_SIZE_STRING = '2MB';

const errorLogFilepath = path.resolve(ROOT_WORKING_DIRECTORY, 'error.log');
const combinedLogFilepath = path.resolve(ROOT_WORKING_DIRECTORY, 'combined.log');

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
    new transports.File({ filename: errorLogFilepath, level: 'error' }),
    new transports.File({ filename: combinedLogFilepath }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export const resetLogs = () => {
  if (existsSync(errorLogFilepath)) rmSync(errorLogFilepath);
  if (existsSync(combinedLogFilepath)) rmSync(combinedLogFilepath);
};

export const resetLargeLogs = () => {
  if (existsSync(combinedLogFilepath) && statSync(combinedLogFilepath).size > MAX_LOG_SIZE) {
    rmSync(combinedLogFilepath);
    logger.info(
      `Reset logs in ${path.basename(
        combinedLogFilepath,
      )} as it exceeded ${MAX_LOG_SIZE_STRING} max size`,
    );
  }
  if (existsSync(errorLogFilepath) && statSync(errorLogFilepath).size > MAX_LOG_SIZE) {
    rmSync(errorLogFilepath);
    logger.info(
      `Reset logs in ${path.basename(
        errorLogFilepath,
      )}  as it exceeded ${MAX_LOG_SIZE_STRING} max size`,
    );
  }
};

export const getCombinedLogs = () => {
  if (!existsSync(combinedLogFilepath)) return '';
  return readFileSync(combinedLogFilepath, 'utf8');
};

export const getErrorLogs = () => {
  if (!existsSync(errorLogFilepath)) return '';
  return readFileSync(errorLogFilepath, 'utf8');
};
