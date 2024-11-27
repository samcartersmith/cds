import React, { memo, StrictMode, useMemo } from 'react';
import { css } from '@linaria/core';
/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react';
import merge from 'lodash/merge';
import { useDarkMode } from 'storybook-dark-mode';
import { sanitizeProps, StoryBuilderConfig } from '@cbhq/cds-common/internal/utils/storyBuilder';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Group } from '../layout/Group';
import { PortalProvider } from '../overlays/PortalProvider';
import { ThemeProvider } from '../system/ThemeProvider';
import { palette } from '../tokens';

import type { GetStory } from './types';

const oldWrapperProps = {
  className: css`
    padding: 20px;
    display: block;
  `,
};

const newWrapperProps = {
  background: true,
  alignItems: 'flex-start',
  spacing: gutter,
  gap: 2,
} as const;

const LocalStrictMode = ({ children }: { children: React.ReactNode }) => {
  const strict = process.env.CI !== 'true';
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return strict ? <StrictMode>{children}</StrictMode> : <>{children}</>;
};

export function StoryContainer<Props>(
  StoryComponent: Story,
  context: StoryBuilderConfig<Props, { children?: React.ReactNode }>,
) {
  const isDarkMode = useDarkMode();
  const stories = context.parameters?.stories;

  const scale = context?.globals?.density === 'dense' ? 'xSmall' : 'large';

  // eslint-disable-next-line react/no-unstable-nested-components
  const Container = memo(() => {
    const contents = useMemo(() => {
      if (stories) {
        // React.Children.toArray will guarantee unique keys when mapped over
        return React.Children.toArray(
          stories.map((child) => {
            const mergedProps = sanitizeProps(merge({}, child.args, context.args));
            // @ts-expect-error - TODO: Fix this
            return React.createElement(child, mergedProps);
          }),
        );
      }
      return <StoryComponent />;
    }, []);

    const InnerWrapper = context.parameters?.wrapper ?? React.Fragment;
    const wrapperProps = stories
      ? context.parameters?.wrapperProps ?? newWrapperProps
      : oldWrapperProps;

    return (
      <LocalStrictMode>
        <ThemeProvider
          display="contents"
          scale={context.args?.scale ?? scale}
          spectrum={context.args?.spectrum ?? (isDarkMode ? 'dark' : 'light')}
        >
          <PortalProvider>
            <Group {...wrapperProps}>
              <InnerWrapper>{contents}</InnerWrapper>
            </Group>
          </PortalProvider>
        </ThemeProvider>
      </LocalStrictMode>
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
