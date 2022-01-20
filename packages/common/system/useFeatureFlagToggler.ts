import { useCallback } from 'react';
import { FeatureFlag, FeatureFlagLocalStorageCallback } from './FeatureFlagContext';
import { useFeatureFlagDispatcher } from './useFeatureFlagDispatcher';

export const useFeatureFlagToggler = () => {
  const dispatch = useFeatureFlagDispatcher();
  return useCallback(
    (name: FeatureFlag, updateLocalStorage?: FeatureFlagLocalStorageCallback) => {
      dispatch({ type: 'toggle', name, updateLocalStorage });
    },
    [dispatch],
  );
};
