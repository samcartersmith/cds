import React from 'react';

import { Box, BoxProps } from './Box';

export type VStackProps = Omit<BoxProps, 'flexDirection'>;

export const VStack: React.FC<VStackProps> = props => <Box {...props} flexDirection="column" />;
