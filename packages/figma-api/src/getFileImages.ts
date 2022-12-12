import { createClient } from './createClient';
import { FileImageResponse } from './types';

export type ImageFormat = 'jpg' | 'png' | 'svg' | 'pdf';

export type GetImageParams = {
  /** Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes */
  ids?: string;
  /** A number between 0.01 and 4, the image scaling factor */
  scale?: number;
  /** The image output format */
  format: ImageFormat;
  /** Whether to include id attributes for all SVG elements.
   * @default false
   */
  svg_include_id?: boolean;
  /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>.
   * @default true
   */
  svg_simplify_stroke?: boolean;
  /** Use the full dimensions of the node regardless of whether or not it is cropped or the space
   * around it is empty. Use this to export text nodes without cropping.
   * @default false
   */
  use_absolute_bounds?: boolean;
  /** A specific version ID to use. Omitting this will use the current version of the file */
  version?: string;
};

const client = createClient<GetImageParams, FileImageResponse>();

/** https://www.figma.com/developers/api#get-images-endpoint */
export async function getFileImages(fileKey: string, params: GetImageParams) {
  return client(`images/${fileKey}`, params);
}
