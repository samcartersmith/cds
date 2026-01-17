import * as fs from 'node:fs';
import * as path from 'node:path';

import { logger } from './logger';

/**
 * Write data to a CSV file
 * @param headers - Array of column headers
 * @param rows - Array of row data (each row is an array of values)
 * @param outputDir - Directory to write the file to
 * @param filename - Name of the CSV file
 */
export function writeCsv(
  headers: string[],
  rows: (string | number)[][],
  outputDir: string,
  filename: string,
): void {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, filename);

  // Escape values that might contain commas or quotes
  const escapeValue = (value: string | number): string => {
    const strValue = String(value);
    if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
      return `"${strValue.replace(/"/g, '""')}"`;
    }
    return strValue;
  };

  const csvLines = [
    headers.map(escapeValue).join(','),
    ...rows.map((row) => row.map(escapeValue).join(',')),
  ];

  const csvContent = csvLines.join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');

  logger.log(`CSV exported to: ${outputPath}`);
}

/**
 * Get the output directory for the lib's dist folder
 */
export function getDistOutputDir(): string {
  return path.join(__dirname, '..', 'dist');
}
