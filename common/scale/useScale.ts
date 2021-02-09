import * as React from 'react';

import { ScaleContext, DEFAULT_SCALE } from './context';

export const useScale = () => {
  const context = React.useContext(ScaleContext);
  if (!context) {
    return DEFAULT_SCALE;
  }
  return context;
};
