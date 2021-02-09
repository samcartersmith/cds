import * as React from 'react';

import { ScaleContext } from './context';
import { Scale } from './types';
import { useScale } from './useScale';

type ScaleProviderProps = {
  value?: Scale;
};

export const ScaleProvider: React.FC<ScaleProviderProps> = React.memo(({ value, children }) => {
  const scale = useScale();
  return <ScaleContext.Provider value={value ?? scale}>{children}</ScaleContext.Provider>;
});

ScaleProvider.displayName = 'ScaleProvider';
