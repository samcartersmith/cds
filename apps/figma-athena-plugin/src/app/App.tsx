import '@cbhq/cds-web/globalStyles';

import React from 'react';
import { Box } from '@cbhq/cds-web/layout/Box';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <Box background="primary">Hello world!</Box>
    </ThemeProvider>
  );
};
