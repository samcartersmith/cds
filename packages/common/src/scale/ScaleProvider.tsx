import React, { memo } from 'react';

import { Scale } from '../types';

import { ScaleContext } from './context';
import { useScale } from './useScale';

type ScaleProviderProps = {
  value?: Scale;
};

export const ScaleProvider: React.FC<React.PropsWithChildren<ScaleProviderProps>> = memo(
  ({ value, children }) => {
    const scale = useScale();
    return <ScaleContext.Provider value={value ?? scale}>{children}</ScaleContext.Provider>;
  },
);

ScaleProvider.displayName = 'ScaleProvider';
