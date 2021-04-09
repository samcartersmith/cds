import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { palette } from '@cbhq/cds-web/tokens';
import { css } from 'linaria';

import type { GetStory } from './types';

export const LightStoryContainer = (getStory: GetStory) => (
  <ThemeProvider scale={DEFAULT_SCALE}>
    <div
      className={css`
        padding: 20px;
      `}
    >
      {getStory()}
    </div>
  </ThemeProvider>
);

export const DarkStoryContainer = (getStory: GetStory) => (
  <ThemeProvider scale={DEFAULT_SCALE} spectrum="dark">
    <div
      className={css`
        padding: 20px;
        /* All stories have the light story container. This offsets the light story container's padding. */
        margin: -20px;
        background-color: ${palette.background};
      `}
    >
      {getStory()}
    </div>
  </ThemeProvider>
);
