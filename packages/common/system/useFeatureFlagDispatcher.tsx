import { useContext } from 'react';
import { noop } from '@cbhq/cds-utils';

import {
  FeatureFlagDispatcherContext,
  FeatureFlagDispatcherContextType,
} from './FeatureFlagContext';

export const useFeatureFlagDispatcher = (): FeatureFlagDispatcherContextType => {
  const context = useContext(FeatureFlagDispatcherContext);
  if (!context) {
    return { dispatch: noop };
  }
  return context;
};
