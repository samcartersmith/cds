import * as fs from 'fs';
import * as path from 'path';

export const logMigrationError = (filePath: string, transformName: string, error: unknown) => {
  const logFilePath = path.join(process.cwd(), 'migration-error-log.txt');

  const absoluteFilePath = path.resolve(filePath);
  const clickableFilePath = `file://${absoluteFilePath}`;

  let errorMessage = 'An unknown error occurred.';
  if (error instanceof Error) {
    errorMessage = error.stack || error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const logEntry = `${new Date().toISOString()} - MIGRATION ERROR
File: ${clickableFilePath}
Transform: ${transformName}
Error: ${errorMessage}

`;

  try {
    fs.appendFileSync(logFilePath, logEntry);
  } catch (err) {
    // If file doesn't exist, create it first
    try {
      fs.writeFileSync(logFilePath, logEntry);
    } catch (writeError) {
      console.warn(`Failed to write to migration error log: ${writeError}`);
    }
  }
};
