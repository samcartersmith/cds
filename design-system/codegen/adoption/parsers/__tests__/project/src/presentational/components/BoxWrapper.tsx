// @ts-nocheck

import { css } from 'linaria';
import React from 'react';
import { Box, VStack } from '@cbhq/cds-web/layout';

// shouldn't track as a wrapped cds component
export const BoxWrapper = () => (
  <Box width="100%" minWidth={1200} height={100} borderRadius="compact" bordered>
    <div
      className={css`
        width: 100%;
      `}
    >
      <VStack>
        <span />
        <span />
      </VStack>
    </div>
  </Box>
);
