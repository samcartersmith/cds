import * as React from 'react';

import type { GetStory } from '@cds/storybook/decorators/types';
import { ThemeProvider } from '@cds/theme';
import { css } from 'linaria';

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
