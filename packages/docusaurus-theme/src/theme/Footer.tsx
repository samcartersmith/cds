import React, { memo } from 'react';
import { Footer as FooterType, SimpleFooter, useThemeConfig } from '@docusaurus/theme-common';
import FooterOriginal from '@theme-init/Footer';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { Link, TextTitle4 } from '@cbhq/cds-web/typography';

function isSimpleFooter(footer?: FooterType): footer is SimpleFooter {
  return !footer?.links.some((item) => item.items);
}

const Footer = memo(function Footer() {
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
                  dangerouslySetClassName="footer-link"
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
});

export default Footer;
