import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { css } from 'linaria';

import type { GetStory } from './types';

export const StoryContainer = (getStory: GetStory) => (
  <ThemeProvider scale="large">
    <div
      className={css`
        padding: 20px;
      `}
    >
      {getStory()}
    </div>
  </ThemeProvider>
);
