import * as React from 'react';

import { ScaleProvider } from '@cb/design-system-web/primitives/scale/context';
import { scales } from '@cb/design-system-web/primitives/scale/scales';
import { fallbackStack } from '@cb/design-system-web/primitives/typography/typography';
import { css } from 'linaria';

export const globalStyle = css`
  :global() {
    body {
      font-family: ${fallbackStack};
    }
  }
`;

type GetStory = () => React.ReactNode;

export const StoryContainer = (getStory: GetStory) => (
  <div
    className={css`
      padding: 20px;
    `}
  >
    {getStory()}
  </div>
);

type StoryNameLabelProps = {
  name: string;
};

const StoryNameLabel: React.FC<StoryNameLabelProps> = ({ name, children }) => {
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
      <h2
        className={css`
          background-color: '#000';
          color: '#fff';
          padding: 4px 8px;
          border-radius: 4px;
          /* stylelint-disable plugin/no-unsupported-browser-features */
          width: fit-content;
        `}
      >
        {name}
      </h2>
      {children}
    </div>
  );
};

export const withStoryLabel = (name: string) => (getStory: GetStory) => (
  <StoryNameLabel name={name}>{getStory()}</StoryNameLabel>
);

export const withScaleProvider = (scale?: keyof typeof scales) => (getStory: GetStory) => (
  <ScaleProvider value={scale}>{getStory()}</ScaleProvider>
);
