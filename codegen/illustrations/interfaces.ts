import { ComponentMetadata } from '../figma/api';

export interface IllustrationSummary {
  variant: string;
  description: string;
  name: string;
}

export type IllustrationProps = {
  variant: string;
  name: string;
};

/** A skeletal structure of what Figma returns back as the component key value pair */
export interface IllustrationComponent {
  [key: string]: ComponentMetadata;
}

export interface IllustrationNamesMap {
  [variant: string]: string[];
}
