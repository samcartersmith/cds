import { getSourcePath } from '../utils/getSourcePath';

import { generateIllustrationStories } from './generateIllustrationStories';

const CHUNK_SIZE = 120;

/**
 * The script generates the illustration stories for web in a storybook v7 compatible manner.
 */
function main() {
  const outputFile = getSourcePath(
    `packages/web/illustrations/__stories__/Illustration.stories.tsx`,
  );
  generateIllustrationStories(outputFile, CHUNK_SIZE);
}

main();
