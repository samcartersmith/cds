import React, { type ReactNode } from 'react';
import { cx } from '@linaria/core';
import type { Props } from '@theme/CodeBlock/Content/Element';
import { Box } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography';
// <pre> tags in markdown map to CodeBlocks. They may contain JSX children. When
// the children is not a simple string, we just return a styled block without
// actually highlighting.
export default function CodeBlockJSX({ children, className }: Props): ReactNode {
  return (
    <Box
      as="pre"
      background="accentSubtleBlue"
      className={cx('thin-scrollbar', className)}
      padding={0}
      tabIndex={0}
    >
      <Text mono as="code" minWidth="100%">
        {children}
      </Text>
    </Box>
  );
}
