import { useContext } from 'react';

import { RootSpectrumPreferenceUpdaterContext } from './context';

export const useRootSpectrumPreferenceUpdater = () =>
  useContext(RootSpectrumPreferenceUpdaterContext);
