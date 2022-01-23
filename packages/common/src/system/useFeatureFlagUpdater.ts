import { useCallback } from 'react';
import { FeatureFlagsPartial, FeatureFlagLocalStorageCallback } from './FeatureFlagContext';
import { useFeatureFlagDispatcher } from './useFeatureFlagDispatcher';

export const useFeatureFlagUpdater = () => {
  const dispatch = useFeatureFlagDispatcher();
  return useCallback(
    (values: FeatureFlagsPartial, updateLocalStorage?: FeatureFlagLocalStorageCallback) => {
      dispatch({ type: 'update', value: values, updateLocalStorage });
    },
    [dispatch],
  );
};
