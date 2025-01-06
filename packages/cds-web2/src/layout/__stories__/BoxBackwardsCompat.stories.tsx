import React from 'react';

import { useTheme } from '../../system/ThemeProvider';
import { ThemeProvider } from '../../system/ThemeProviderBackwardsCompat';
import { Box } from '../BoxBackwardsCompat';

export default {
  component: Box,
  title: 'Backwards Compatibility',
};

export const BackwardsCompatibility = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box padding={4}>
        <Box
          background="backgroundPrimary"
          marginTop={-2}
          offsetTop={2}
          spacing={6}
          spacingEnd={2}
        />
      </Box>
    </ThemeProvider>
  );
};
