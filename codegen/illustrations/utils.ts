import chalk from 'chalk';
import { Ora } from 'ora';

import { IllustrationSummary } from './interfaces';

/**
 * Status Message Logging Utils
 */
export const errMsg = (spinner: Ora, message: string) => {
  spinner.fail(`${chalk.redBright('error')} ${message}`);
};

export const successMsg = (spinner: Ora, message: string) => {
  spinner.succeed(`${chalk.greenBright('success')} ${message}`);
};

/**
 *  Image Manipulation utility functions
 */
export const binaryToBase64 = (binaryData: string): string => {
  return Buffer.from(binaryData).toString('base64');
};

/**
 * Check every field in the metadata except for versionNum
 * to see if they equal
 * @param metadata1
 * @param metadata2
 * @returns
 */
export const isMetadataEqual = (
  metadata1: IllustrationSummary,
  metadata2: IllustrationSummary,
): boolean => {
  return (
    metadata1.name === metadata2.name &&
    metadata1.spectrum === metadata2.spectrum &&
    metadata1.variant === metadata2.variant &&
    metadata1.description === metadata2.description
  );
};

/**
 * Given a correctly formatted versionManifestKey, it will return a map
 * with name and spectrum that maps to the correct name and spectrum
 * @param versionManifestKey - String must be in this format <name of illustration>-<spectrum>
 * @returns
 */
export const fromVersionManifestKey = (versionManifestKey: string) => {
  const [name, spectrum] = versionManifestKey.split('-');
  return {
    name,
    spectrum,
  };
};
