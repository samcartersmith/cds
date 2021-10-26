import { useContext } from 'react';
import { noop } from '@cbhq/cds-utils';
import { FeatureFlagUpdater } from './FeatureFlagContext';

export const useFeatureFlagUpdater = () => {
  const context = useContext(FeatureFlagUpdater);
  if (!context) {
    return noop;
  }
  return context;
};
