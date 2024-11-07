import React, { memo } from 'react';
import { css } from 'linaria';
import { SystemProvider, SystemProviderProps } from '@cbhq/cds-common';

import { FramerMotionProvider, FramerMotionProviderProps } from '../animation/FramerMotionProvider';
import { cx } from '../utils/linaria';

import { useThemeProviderStyles } from './useThemeProviderStyles';

// https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents
const displayContents = css`
  display: contents;
`;

type ThemeManagerProps = {
  /** Visually remove the ThemeProviders box and replace it with its content. 
  Conceptually this makes ThemeProvider behave like React.Fragment,
  but we can still apply css variable overrides via style attribute for its children to inherit. */
  display?: 'contents';
};

export type ThemeProviderProps = SystemProviderProps &
  ThemeManagerProps &
  FramerMotionProviderProps;

const ThemeManager: React.FC<React.PropsWithChildren<ThemeManagerProps>> = ({
  children,
  display,
}) => {
  const { style, className } = useThemeProviderStyles();
  return (
    <div className={cx(className, display === 'contents' && displayContents)} style={style}>
      {children}
    </div>
  );
};

export const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = memo(
  ({ children, display, motionFeatures, ...props }) => {
    return (
      <FramerMotionProvider motionFeatures={motionFeatures}>
        <SystemProvider {...props}>
          <ThemeManager display={display}>{children}</ThemeManager>
        </SystemProvider>
      </FramerMotionProvider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';
