import React, { memo, StrictMode, useMemo } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react';
import merge from 'lodash/merge';
import { useDarkMode } from 'storybook-dark-mode';
import { sanitizeProps, StoryBuilderConfig } from '@cbhq/cds-common2/internal/utils/storyBuilder';
// import { gutter } from '@cbhq/cds-common2/tokens/sizing';

import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { MediaQueryProvider } from '@cbhq/cds-web2/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';
// TODO migrate Group
// import { Group } from '@cbhq/cds-web2/layout/Group';

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
        <MediaQueryProvider>
          <ThemeProvider
            display="contents"
            activeColorScheme={isDarkMode ? 'dark' : 'light'}
            theme={defaultTheme}
          >
            <PortalProvider>
              {/* <Group {...wrapperProps}> */}
              <InnerWrapper>
                {/* arbitrary padding to make the storybook layout match the old storybook for easier comparison */}
                <div style={{ padding: 20 }}>{contents}</div>
              </InnerWrapper>
              {/* </Group> */}
            </PortalProvider>
          </ThemeProvider>
        </MediaQueryProvider>
      </LocalStrictMode>
    );
  });

  Container.displayName = 'StoryContainer';
  return <Container />;
}
