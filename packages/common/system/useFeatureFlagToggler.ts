import { useCallback } from 'react';

import { FeatureFlag, FeatureFlagsOnChange } from './FeatureFlagContext';
import { useFeatureFlagDispatcher } from './useFeatureFlagDispatcher';

export const useFeatureFlagToggler = () => {
  const dispatcher = useFeatureFlagDispatcher();
  return useCallback(
    (name: FeatureFlag, onChange?: FeatureFlagsOnChange) => {
      dispatcher.dispatch({ type: 'toggle', name, onChange: onChange ?? dispatcher?.onChange });
    },
    [dispatcher],
  );
};
