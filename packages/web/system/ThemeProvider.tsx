import React, { memo } from 'react';
import { css } from 'linaria';
import { SystemProvider, SystemProviderProps } from '@cbhq/cds-common';

import { FramerMotionProvider } from '../animation/FramerMotionProvider';
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

export type ThemeProviderProps = SystemProviderProps & ThemeManagerProps;

const ThemeManager: React.FC<ThemeManagerProps> = ({ children, display }) => {
  const { style, className } = useThemeProviderStyles();
  return (
    <div style={style} className={cx(className, display === 'contents' && displayContents)}>
      {children}
    </div>
  );
};

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  ({ children, display, ...props }) => {
    return (
      <FramerMotionProvider>
        <SystemProvider {...props}>
          <ThemeManager display={display}>{children}</ThemeManager>
        </SystemProvider>
      </FramerMotionProvider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';
