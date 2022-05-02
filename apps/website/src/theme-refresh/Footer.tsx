import React from 'react';
import { Footer as FooterType, SimpleFooter, useThemeConfig } from '@docusaurus/theme-common';
import { css } from '@linaria/core';
import FooterOriginal from '@theme-original/Footer';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { Link, TextTitle4 } from '@cbhq/cds-web/typography';

// TODO: Remove when we add this prop to Link component
const tempLinkOverride = css`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--foreground);
    height: 1px;
    width: 100%;
  }
`;

function isSimpleFooter(footer?: FooterType): footer is SimpleFooter {
  return !footer?.links.some((item) => item.items);
}

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  if (isSimpleFooter(footer)) {
    return (
      <ThemeProvider spectrum="dark" display="contents">
        <HStack spacingBottom={4} background>
          <Box width="calc(var(--doc-sidebar-width) + var(--spacing-8))" />
          <HStack
            minHeight={180}
            justifyContent="space-between"
            spacingHorizontal={4}
            width="100%"
            alignItems="flex-end"
          >
            <HStack gap={3}>
              {footer.links.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  variant="title4"
                  color="foreground"
                  dangerouslySetClassName={tempLinkOverride}
                  openInNewWindow
                >
                  {item.label ?? ''}
                </Link>
              ))}
            </HStack>
            <TextTitle4 as="p">{`© ${new Date().getFullYear()} Coinbase Design`}</TextTitle4>
          </HStack>
        </HStack>
      </ThemeProvider>
    );
  }

  return <FooterOriginal {...footer} />;
}

export default React.memo(Footer);
