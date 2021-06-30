import React, { memo } from 'react';

import { SystemProvider, SystemProviderProps } from '@cbhq/cds-common';

import { useThemeProviderStyles } from './useThemeProviderStyles';

const ThemeManager: React.FC = ({ children }) => {
  const props = useThemeProviderStyles();
  return <div {...props}>{children}</div>;
};

export const ThemeProvider: React.FC<SystemProviderProps> = memo(({ children, ...props }) => {
  return (
    <SystemProvider {...props}>
      <ThemeManager>{children}</ThemeManager>
    </SystemProvider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';
