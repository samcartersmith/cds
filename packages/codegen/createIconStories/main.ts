import { getSourcePath } from '../utils/getSourcePath';

import { generateIconStories } from './generateIconStories';

/**
 * The script generates the icon stories for web in a storybook v7 compatible manner.
 */
function main() {
  const outputFile = getSourcePath(`packages/web/icons/__stories__/Icon.stories.tsx`);
  generateIconStories(outputFile);
}

main();
