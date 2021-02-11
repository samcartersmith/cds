import React from 'react';

import { Box, BoxProps } from './Box';

export const HStack: React.FC<BoxProps> = props => <Box {...props} flexDirection="row" />;

export { BoxProps as HStackProps };
