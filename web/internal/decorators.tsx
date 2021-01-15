import * as React from 'react';

import { fallbackStack } from '@cb/design-system-web/styles/shared';
import { ThemeProvider } from '@cds/theme';
import { DEFAULT_SCALE } from '@cds/theme/scale/context';
import { css } from 'linaria';

type GetStory = () => React.ReactNode;

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

type StoryNameLabelProps = {
  name: string;
};

export const StoryNameLabel: React.FC<StoryNameLabelProps> = ({ name, children }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        & > :first-child {
          margin-bottom: 20px;
        }
      `}
    >
      <div
        className={css`
          background-color: #eee;
          border-radius: 4px;
          padding: 4px 8px;

          font-family: ${fallbackStack};
          font-size: 16px;
          font-weight: 500;

          width: fit-content;
        `}
      >
        {name}
      </div>
      {children}
    </div>
  );
};

// eslint-disable-next-line react/display-name
export const withStoryLabel = (name: string) => (getStory: GetStory) => (
  <StoryNameLabel name={name}>{getStory()}</StoryNameLabel>
);
