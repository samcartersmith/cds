import * as React from 'react';

import { css } from 'linaria';

import { GetStory } from './types';

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
          background-color: var(--background-alternate);
          border-radius: 4px;
          padding: 4px 8px;

          font-family: 'Nunito Sans', -apple-system, sans-serif;
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
