import fs from 'fs';
import path from 'path';
import { getSourcePath } from '../../utils/getSourcePath';
import type { PreviousAdoptionStats } from '../types';

export async function getPreviousStats(id: string): Promise<PreviousAdoptionStats | undefined> {
  try {
    const pathPrefix = await getSourcePath('codegen/adoption/results');
    const statsPath = path.join(pathPrefix, `${id}-stats.json`);
    // New projects won't have a stats.json file associated with it
    if (fs.existsSync(statsPath)) {
      const data = await fs.promises.readFile(statsPath, 'utf8');
      if (data) return JSON.parse(data) as PreviousAdoptionStats;
    }
    return undefined;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(`Couldn't get previous adoption stats for ${id}.`);
    } else {
      throw err;
    }
  }
}
