import * as React from 'react';

import { Scale } from '@cb/design-system-web/primitives';
import { fallbackStack } from '@cb/design-system-web/styles/shared';
import * as scaleStyles from '@cds/theme/styles/scale';
import { css } from 'linaria';

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

          /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
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

// eslint-disable-next-line react/display-name
export const withScale = (scale: Scale) => (getStory: GetStory) => (
  <div className={scaleStyles[scale]}>{getStory()}</div>
);
