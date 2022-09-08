import { useContext } from 'react';

import {
  FeatureFlagDispatcherContext,
  FeatureFlagDispatcherContextType,
} from './FeatureFlagContext';

export const useFeatureFlagDispatcher = (): FeatureFlagDispatcherContextType => {
  return useContext(FeatureFlagDispatcherContext);
};
