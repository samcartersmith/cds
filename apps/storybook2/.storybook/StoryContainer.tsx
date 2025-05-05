import React, { memo, StrictMode, useMemo } from 'react';
import { css } from '@linaria/core';
import { Story } from '@storybook/react';
import merge from 'lodash/merge';
import { useDarkMode } from 'storybook-dark-mode';
import { sanitizeProps, StoryBuilderConfig } from '@cbhq/cds-common2/internal/utils/storyBuilder';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import { Group } from '@cbhq/cds-web2/layout/Group';
import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { MediaQueryProvider } from '@cbhq/cds-web2/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

const oldWrapperProps = {
  className: css`
    padding: 20px;
    display: block;
  `,
};

const newWrapperProps = {
  background: 'bg',
  alignItems: 'flex-start',
  padding: gutter,
  gap: 2,
} as const;

const LocalStrictMode = ({ children }: { children: React.ReactNode }) => {
  const strict = process.env.CI !== 'true';
  return strict ? <StrictMode>{children}</StrictMode> : <>{children}</>;
};

export function StoryContainer<Props>(
  StoryComponent: Story,
  context: StoryBuilderConfig<Props & { isDarkMode?: boolean }, { children?: React.ReactNode }>,
) {
  const darkModeArg = context.args?.isDarkMode;
  const isDarkModeState = useDarkMode();
  const isDarkModeValue = darkModeArg ?? isDarkModeState;

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
    const wrapperProps = stories
      ? context.parameters?.wrapperProps ?? newWrapperProps
      : oldWrapperProps;
    return (
      <LocalStrictMode>
        <MediaQueryProvider>
          <ThemeProvider
            activeColorScheme={isDarkModeValue ? 'dark' : 'light'}
            display="contents"
            theme={defaultTheme}
          >
            <PortalProvider>
              <Group {...wrapperProps}>
                <InnerWrapper>{contents}</InnerWrapper>
              </Group>
            </PortalProvider>
          </ThemeProvider>
        </MediaQueryProvider>
      </LocalStrictMode>
    );
  });

  Container.displayName = 'StoryContainer';
  return <Container />;
}
