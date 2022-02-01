import React, { memo, useMemo } from 'react';
import { Story } from '@storybook/react';
import { css } from 'linaria';
import { merge } from 'lodash';
import { sanitizeProps, StoryBuilderConfig } from '@cbhq/cds-common/internal/utils/storyBuilder';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Group } from '../layout/Group';
import { ThemeProvider } from '../system/ThemeProvider';
import { palette } from '../tokens';

import type { GetStory } from './types';

const wrapperProps = {
  old: {
    dangerouslySetClassName: css`
      padding: 20px;
      display: block;
    `,
  },
  new: {
    background: true,
    alignItems: 'flex-start',
    spacing: gutter,
    gap: 2,
  },
} as const;

export function StoryContainer<Props>(
  StoryComponent: Story,
  context: StoryBuilderConfig<Props, { children?: React.ReactNode }>,
) {
  const stories = context.parameters?.stories;
  const Container = memo(() => {
    const contents = useMemo(() => {
      if (stories) {
        // React.Children.toArray will guarantee unique keys when mapped over
        return React.Children.toArray(
          stories.map((child) => {
            const mergedProps = sanitizeProps(merge({}, child.args, context.args));
            return React.createElement(child, mergedProps);
          }),
        );
      }
      return <StoryComponent />;
    }, []);

    const InnerWrapper = context.parameters?.wrapper ?? React.Fragment;
    const isNewStory = context.args?.frontier !== undefined ?? stories;

    return (
      <FeatureFlagProvider frontier={context.args?.frontier}>
        <ThemeProvider
          display="contents"
          scale={context.args?.scale}
          spectrum={context.args?.spectrum}
        >
          <Group {...wrapperProps[isNewStory ? 'new' : 'old']}>
            <InnerWrapper>{contents}</InnerWrapper>
          </Group>
        </ThemeProvider>
      </FeatureFlagProvider>
    );
  });

  Container.displayName = 'StoryContainer';
  return <Container />;
}

// TODO: delete once Checkbox and Switch are migrated to storyBuilder
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
