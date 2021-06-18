import { useCallback, useEffect, useState } from 'react';

import { AppState, AppStateStatus } from 'react-native';

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleChange = useCallback((newState: AppStateStatus) => {
    setAppState(newState);
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, [handleChange]);

  return appState;
};
