import { useContext } from 'react';
import { noop } from '@cbhq/cds-utils';
import { FeatureFlagDispatcherContext } from './FeatureFlagContext';

export const useFeatureFlagDispatcher = () => {
  const context = useContext(FeatureFlagDispatcherContext);
  if (!context) {
    return noop;
  }
  return context;
};
