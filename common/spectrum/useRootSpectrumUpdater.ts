import { useContext } from 'react';

import { RootSpectrumUpdaterContext } from './context';

/** A user's preference can be saved in localStorage or on the backend. Use useRootSpectrumUpdater to update CDS side once user preference is known. */
export const useRootSpectrumUpdater = () => useContext(RootSpectrumUpdaterContext);
