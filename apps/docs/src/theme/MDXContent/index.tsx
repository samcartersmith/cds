import React, { type ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import type { Props } from '@theme/MDXContent';
import { VStack } from '@cbhq/cds-web2/layout';

export default function MDXContent({ children }: Props): ReactNode {
  return (
    <MDXProvider components={MDXComponents}>
      <VStack gap={4}>{children}</VStack>
    </MDXProvider>
  );
}
