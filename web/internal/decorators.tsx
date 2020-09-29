import * as React from 'react';

import { TextLabel1 } from '@cb/design-system-web/components/Text/Text';
import { DEFAULT_SCALE, scales } from '@cb/design-system-web/primitives/scale/scale';
import * as styles from '@cb/design-system-web/primitives/scale/styles';
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
      <TextLabel1>{name}</TextLabel1>
      {children}
    </div>
  );
};

export const withStoryLabel = (name: string) => (getStory: GetStory) => (
  <StoryNameLabel name={name}>{getStory()}</StoryNameLabel>
);

export const withScale = (scale: keyof typeof scales = DEFAULT_SCALE) => (getStory: GetStory) => (
  <div className={styles[scale]}>{getStory()}</div>
);
