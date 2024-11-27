import React, { memo, StrictMode, useMemo } from 'react';
import { css, cx } from '@linaria/core';
/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react';
import merge from 'lodash/merge';
import { useDarkMode } from 'storybook-dark-mode';
import { sanitizeProps, StoryBuilderConfig } from '@cbhq/cds-common/internal/utils/storyBuilder';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Button } from '@cbhq/cds-web2/buttons/Button';

import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { ThemeProvider } from '@cbhq/cds-web2/providers/ThemeProvider';
import { autoTheme } from '@cbhq/cds-web2/themes/auto';
import { darkTheme } from '@cbhq/cds-web2/themes/dark';
import { lightTheme } from '@cbhq/cds-web2/themes/light';

const themeMap = {
  auto: autoTheme,
  light: lightTheme,
  dark: darkTheme,
} as const;

// const oldWrapperProps = {
//   className: css`
//     padding: 20px;
//     display: block;
//   `,
// };

// const newWrapperProps = {
//   background: true,
//   alignItems: 'flex-start',
//   spacing: gutter,
//   gap: 2,
// } as const;

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
    // const wrapperProps = stories
    //   ? context.parameters?.wrapperProps ?? newWrapperProps
    //   : oldWrapperProps;
    return (
      <LocalStrictMode>
        <ThemeProvider display="contents" theme={isDarkMode ? themeMap.dark : themeMap.light}>
          <PortalProvider>
            {/* <Group {...wrapperProps}> */}
            <InnerWrapper>{contents}</InnerWrapper>
            {/* </Group> */}
          </PortalProvider>
        </ThemeProvider>
      </LocalStrictMode>
    );
  });

  Container.displayName = 'StoryContainer';
  return <Container />;
}
