import * as fs from 'fs';
import * as path from 'path';

/**
 * Logs cases that require manual migration to a centralized log file
 * @param filePath - The file path where the manual migration is needed
 * @param element - The element that needs manual migration
 * @param reason - The reason why manual migration is required
 */
export const logManualMigration = (filePath: string, element?: string, reason?: string) => {
  // Create log file in the consumer repo root (current working directory)
  const logFilePath = path.join(process.cwd(), 'manual-migration-log.txt');

  console.log(`Attempting to write log to: ${logFilePath}`);

  // Convert relative path to absolute path for IDE linking
  const absoluteFilePath = path.resolve(filePath);
  // Format as clickable link for IDEs
  const clickableFilePath = `file://${absoluteFilePath}`;
  const logEntry = `${new Date().toISOString()} - Manual migration needed
File: ${clickableFilePath}
Element/Variable: ${element}
Reason: ${reason}
Action Required: Manual migration needed

`;

  try {
    fs.appendFileSync(logFilePath, logEntry);
    console.log(`Successfully wrote to log file: ${logFilePath}`);
  } catch (error) {
    console.warn(`Failed to append to log file, trying to create: ${error}`);
    // If file doesn't exist, create it first
    try {
      fs.writeFileSync(logFilePath, logEntry);
      console.log(`Successfully created and wrote to log file: ${logFilePath}`);
    } catch (writeError) {
      console.warn(`Failed to write to manual migration log: ${writeError}`);
      console.warn(`Attempted path: ${logFilePath}`);
    }
  }
};
