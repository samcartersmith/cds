import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import { merge } from 'lodash';
import { Story } from '@storybook/react';
import { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { StoryBuilderConfig } from '@cbhq/cds-common/internal/utils/storyBuilder';

import { VStack } from '@cbhq/cds-web/layout/VStack';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { palette } from '@cbhq/cds-web/tokens';

import type { GetStory } from './types';

const FallbackWrapper: React.FC = (props) => <VStack alignItems="flex-start" gap={2} {...props} />;

export function StoryContainer<T>(StoryComponent: Story, context: StoryBuilderConfig<T>) {
  const Container = memo(() => {
    const contents = useMemo(() => {
      if (context.parameters?.stories) {
        // React.Children.toArray will guarantee unique keys when mapped over
        return React.Children.toArray(
          context.parameters?.stories.map((child) => {
            const mergedProps = merge({}, child.args, context.args);
            return React.createElement(child, mergedProps);
          }),
        );
      }
      return <StoryComponent />;
    }, []);

    const storyLength = context.parameters?.stories?.length ?? 1;
    const Wrapper = context.parameters?.wrapper ?? FallbackWrapper;

    return (
      <FeatureFlagProvider frontier={context.args?.frontier}>
        <ThemeProvider
          display="contents"
          scale={context.args?.scale}
          spectrum={context.args?.spectrum}
        >
          <div
            className={css`
              padding: 20px;
            `}
          >
            {storyLength > 1 ? <Wrapper>{contents}</Wrapper> : <StoryComponent />}
          </div>
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
