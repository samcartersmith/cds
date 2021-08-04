import { ComponentMetadata } from '../figma/api';

/**
 * An important thing to understand is what determines
 * whether a file has changed or not.
 *
 * These are the conditions that suggest a file has changed,
 * and thus versionNum will be updated.
 * - Figma's name or variant or spectrum or description has changed
 * - The image on Figma is different from the one stored locally here
 */
export type IllustrationSummary = {
  variant: string;
  description: string;
  name: string;
  spectrum: string;
  versionNum: number;
};

export type IllustrationProps = {
  variant: string;
  name: string;
  spectrum: string;
};

/** A skeletal structure of what Figma returns back as the component key value pair */
export type IllustrationComponent = Record<string, ComponentMetadata>;

export type IllustrationNamesMap = Record<string, string[]>;

/**
 * Structure for keeping track of version of illustration. Base version
 * started at 0
 */
export type VersionNumManifestStruct = Record<string, number>;
