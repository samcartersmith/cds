import fs from 'fs';
import { writePrettyFile } from '@cbhq/cds-web-utils';

import { getSourcePath } from '../utils/getSourcePath';

type ReleasedIllustrationsTypes = {
  newIllustrations: string[];
  modifiedIllustrations: string[];
  deletedIllustrations: string[];
};

export const generateReleaseHistory = async (
  dest: string,
  releasedIllustrations: ReleasedIllustrationsTypes,
) => {
  const today = new Date().toDateString();
  const absoluteDest = getSourcePath(dest);

  try {
    const prevHistoryAsString = await fs.promises.readFile(absoluteDest, 'utf-8');
    const prevHistory = JSON.parse(prevHistoryAsString) as Record<
      string,
      ReleasedIllustrationsTypes
    >;

    const newHistory = JSON.stringify({
      [today]: releasedIllustrations,
      ...prevHistory,
    });

    await writePrettyFile({
      outFile: absoluteDest,
      contents: newHistory,
      logInfo: dest,
      parser: 'json',
    });
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
