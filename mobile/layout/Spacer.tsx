import React from 'react';

import { Box, BoxProps } from './Box';

export const Spacer: React.FC<BoxProps> = props => (
  <Box flexGrow={1} flexShrink={1} flexBasis="auto" {...props} />
);

export type { BoxProps as SpacerProps };
