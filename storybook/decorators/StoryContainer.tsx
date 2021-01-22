import * as React from 'react';

import type { GetStory } from '@cds/storybook/decorators/types';
import { ThemeProvider } from '@cds/theme';
import { DEFAULT_SCALE } from '@cds/theme/scale/context';
import { css } from 'linaria';

export const StoryContainer = (getStory: GetStory) => (
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
