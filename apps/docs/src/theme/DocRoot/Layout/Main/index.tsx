import React from 'react';
import type { Props } from '@theme/DocRoot/Layout/Main';
import { HStack } from '@cbhq/cds-web2/layout';

const mainStyles = {
  margin: '0 auto',
} as const;

const maxWidthConfig = {
  desktop: `min(1200px, calc(100% - var(--ifm-navbar-sidebar-width)))`,
  base: '100%',
} as const;
const paddingBottomConfig = { base: 4, tablet: 6 } as const;
const paddingTopConfig = { phone: 2, base: 3 } as const;
const paddingXConfig = { desktop: 8, tablet: 6, base: 3 } as const;

export default function DocRootLayoutMain({ children }: Props): JSX.Element {
  return (
    <HStack
      alignItems="flex-start"
      as="main"
      gap={5}
      maxWidth={maxWidthConfig}
      paddingBottom={paddingBottomConfig}
      paddingTop={paddingTopConfig}
      paddingX={paddingXConfig}
      style={mainStyles}
    >
      {children}
    </HStack>
  );
}
