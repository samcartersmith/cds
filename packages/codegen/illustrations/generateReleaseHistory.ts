import { illustrationReleaseHistory } from '@cbhq/cds-common/internal/data/illustrationReleaseHistory';
import { ReleasedIllustrationsTypes } from '@cbhq/cds-common/types/IllustrationProps';

import { writeFile } from '../utils/writeFile';

export const generateReleaseHistory = async (
  dest: string,
  releasedIllustrations: ReleasedIllustrationsTypes,
) => {
  const today = new Date().toDateString();

  try {
    await writeFile({
      template: 'objectMap.ejs',
      data: {
        illustrationReleaseHistory: {
          [today]: releasedIllustrations,
          ...illustrationReleaseHistory,
        },
      },
      config: {
        disableAsConst: true,
        imports: [
          {
            func: '{ ReleasedIllustrationsTypes }',
            module: '../../types/IllustrationProps',
          },
        ],
      },
      types: {
        illustrationReleaseHistory: 'Record<string, ReleasedIllustrationsTypes>',
      },
      dest,
    });
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
