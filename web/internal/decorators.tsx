import * as React from 'react';

import { DEFAULT_SCALE, scales } from '@cb/design-system-web/primitives/scale/scale';
import * as styles from '@cb/design-system-web/primitives/scale/styles';
import { fallbackStack } from '@cb/design-system-web/styles/shared';
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
export const withScale = (scale: keyof typeof scales = DEFAULT_SCALE) => (getStory: GetStory) => (
  <div className={styles[scale]}>{getStory()}</div>
);
