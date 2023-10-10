import type { Config } from 'svgo';
import type { SyncedLibrary } from '@cbhq/figma-api';
import { downloadSvgImage } from '@cbhq/figma-api';

import { optimizeSvg } from './optimizeSvg';

export async function getIdMappedSvg(
  id: string,
  syncedLibrary: SyncedLibrary,
  svgoConfig?: Config,
) {
  const svg = await downloadSvgImage(syncedLibrary.imageUrls.svg[id]);

  return { [id]: optimizeSvg(svg, svgoConfig) };
}
