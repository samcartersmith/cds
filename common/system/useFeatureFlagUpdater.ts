import { useCallback } from 'react';
import { FeatureFlagsPartial, FeatureFlagsOnChange } from './FeatureFlagContext';
import { useFeatureFlagDispatcher } from './useFeatureFlagDispatcher';

export const useFeatureFlagUpdater = () => {
  const dispatcher = useFeatureFlagDispatcher();
  return useCallback(
    (values: FeatureFlagsPartial, onChange?: FeatureFlagsOnChange) => {
      dispatcher.dispatch({
        type: 'update',
        value: values,
        onChange: onChange ?? dispatcher?.onChange,
      });
    },
    [dispatcher],
  );
};
