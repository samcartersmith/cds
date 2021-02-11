import React from 'react';

import { Box, BoxProps } from './Box';

export const VStack: React.FC<BoxProps> = props => <Box {...props} flexDirection="column" />;

export { BoxProps as VStackProps };
