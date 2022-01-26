import React, { memo, useContext } from 'react';

import { themeBase } from '../themes/themeBase';
import { themeFrontier } from '../themes/themeFrontier';

import { FeatureFlagContext } from './FeatureFlagContext';
import { ThemeConfigProvider } from './ThemeConfigProvider';

export const ThemeConfigRootProvider: React.FC = memo(({ children }) => {
  const { frontierColor } = useContext(FeatureFlagContext);
  return (
    <ThemeConfigProvider value={frontierColor ? themeFrontier : themeBase}>
      {children}
    </ThemeConfigProvider>
  );
});

ThemeConfigRootProvider.displayName = 'ThemeConfigRootProvider';
