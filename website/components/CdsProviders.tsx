import { memo } from 'react';
import { css } from 'linaria';
import useThemeContext from '@theme/hooks/useThemeContext';

import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';

const overrides = css`
  display: contents;
  --ifm-avatar-photo-size-md: 80px;
  --ifm-background-color: var(--background);
  --ifm-pre-background: var(--background);
  --ifm-color-primary: var(--primary);
  --ifm-link-color: var(--primary);
  .markdown h1:first-child {
    margin: 0;
  }
  [class^='playgroundPreview'],
  [class*=' playgroundPreview'] {
    padding: 0;
  }
`;

export const CdsProviders: React.FC = memo(({ children }) => {
  const { isDarkTheme } = useThemeContext();
  return (
    <FeatureFlagProvider>
      <RootScaleProvider>
        <ThemeProvider spectrum={isDarkTheme ? 'dark' : 'light'}>
          <div className={overrides}>{children}</div>
        </ThemeProvider>
      </RootScaleProvider>
    </FeatureFlagProvider>
  );
});

CdsProviders.displayName = 'CdsProviders';
