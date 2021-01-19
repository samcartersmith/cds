import React from 'react';

import { ThemeProvider } from '@cds/theme';
import * as CdsWeb from '@cds/web';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...CdsWeb,
  ThemeProvider,
};

export default ReactLiveScope;
