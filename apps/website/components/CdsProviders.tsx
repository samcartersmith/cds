import { memo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { css } from 'linaria';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';
import { fontFamily, palette, spacing } from '@cbhq/cds-web/tokens';

const overrides = css`
  display: contents;
  --ifm-avatar-photo-size-md: 80px;
  --ifm-background-color: var(--background);
  --ifm-pre-background: var(--background);
  --ifm-color-primary: var(--primary);
  --ifm-link-color: var(--primary);
  --ifm-tabs-color: var(--foreground);
  --ifm-tabs-color-active: var(--primary);
  --ifm-tabs-color-active-border: var(--primary);

  .markdown h1:first-child {
    margin: 0;
  }
  [class^='playgroundPreview'],
  [class*=' playgroundPreview'] {
    padding: 0;
  }
  .tabs__item {
    padding: ${spacing[2]} 0;
    margin-right: ${spacing[3]};
    font-family: ${fontFamily.sans};
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background: transparent;
      color: ${palette.primary};
    }
  }

  nav.menu {
    padding: 0;
    @supports (scrollbar-gutter: stable) {
      scrollbar-gutter: stable;
      overflow-y: auto;
    }
  }
`;

export const CdsProviders: React.FC = memo(({ children }) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  return (
    <PortalProvider>
      <FeatureFlagProvider frontier flexGap>
        <RootScaleProvider>
          <ThemeProvider display="contents" spectrum={isDarkTheme ? 'dark' : 'light'}>
            <div className={overrides}>{children}</div>
          </ThemeProvider>
        </RootScaleProvider>
      </FeatureFlagProvider>
    </PortalProvider>
  );
});

CdsProviders.displayName = 'CdsProviders';
