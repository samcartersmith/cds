import React, { memo, useMemo } from 'react';
import KBarModal from '@theme/KBarModal';
import type { KBarProviderProps } from '@theme/KBarProvider';
import useKBarPluginData from '@theme/useKBarPluginData';
import useKBarThemeActions from '@theme/useKBarThemeActions';
import { KBarProvider as OriginalKBarProvider } from 'kbar';

const KBarProvider = memo(function KBarProvider({ children }: KBarProviderProps) {
  const { actions: pluginActions } = useKBarPluginData();
  const themeActions = useKBarThemeActions();
  const actions = useMemo(() => [...pluginActions, ...themeActions], [pluginActions, themeActions]);

  return (
    <OriginalKBarProvider actions={actions}>
      <KBarModal />
      {children}
    </OriginalKBarProvider>
  );
});

export default KBarProvider;
