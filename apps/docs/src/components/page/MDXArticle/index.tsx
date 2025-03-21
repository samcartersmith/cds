import React from 'react';
import { Box, Divider } from '@cbhq/cds-web2/layout';

export function MDXArticle({
  children,
  hideDivider,
}: {
  children: React.ReactNode;
  hideDivider: boolean;
}) {
  return (
    <>
      <Box as="article" display="block" padding={4}>
        {children}
      </Box>
      {!hideDivider && <Divider />}
    </>
  );
}
